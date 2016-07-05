var test = require('tape'),
    settings = require('./settings.json'),
    url = settings.url,
    collections = settings.collections,
    user = {
      username: 'mike',
      pwd: 'pwd'
    },
    Miffo = require('../miffo.js'),
    db = new Miffo(url, collections);
    require('console.mute');

test('bad args', function(t){
  [
    {a: {c: null, u: null}, d: 'Throws on no args'},
    {a: {c: ['miffo'], u: null}, d: 'Throws on no url'},
    {a: {c: null, u: 'www'}, d: 'Throws on no collections'}
  ].forEach(function(o){
    t.throws(function(){new Miffo(o.a.u, o.a.c)}, /Missing args/, o.d);
  });
  t.end();
});

test('constructor', function(t){
  t.equal(db.opts.url, url, 'has .url');
  t.equal(db.opts.collections, collections, 'has .collections');
  t.equal(typeof db.oid, 'function', 'has .oid');
  t.equal(typeof db.bcrypt, 'object', 'has .bcrypt');  
  t.end();
});

test('.start', function(t){
  console.mute();
  
  db.start(function(){
    var data = console.resume();
    t.equal(data[0], 'db connected', 'connection');
    t.equal(typeof db[collections[0]].find, 'function', 'wrapper API');
    t.end();
  });
});

test('operations', function(t){  
  db.test.insert(user, function(err, data){
    t.error(err, 'err null');
    t.equal(data.result.n, 1, 'insert op');
    
    db.test.updateOne({username: user.username}, {$set: {username: 'Julie' }}, function(err, data){
      t.error(err, 'err null');
      t.equal(data.result.n, 1, 'update op');

      db.test.deleteOne({username: "Julie"}, function(err, data){
        t.error(err, 'err null');
        t.equal(data.result.n, 1, 'delete op');
        
        db.test.find({}).toArray(function(err, data){
          t.error(err, 'err null');
          t.equal(data.length, 0, 'find op');
          
          db.connection.close();
          t.end();
        });
      });
    });
  });
});

test('.oid', function(t){
  var _id = db.oid(),
      hex = _id.toHexString();  
  
  t.equal(typeof _id, 'object', 'ObjectID');
  t.equal(hex.length, 24, 'hex');  // check that its 24 chars long
  t.end();
});

test('.bcrypt', function(t){
  db.bcrypt.hash(user.pwd, 10, function(err, hash) {
    t.error(err, 'err null');    
    t.equal(typeof hash, 'string', '.hash');
    
    db.bcrypt.compare(user.pwd, hash, function(err, res) {
      t.error(err, 'err null');
      t.equal(res, true, '.compare');
      t.end();
    });
  });
});

