var test = require('tape'),
    settings = require('./settings.json'),
    url = settings.url,
    collections = settings.collections,
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

test('start', function(t){
  console.mute();
  
  db.start(function(){
    var data = console.resume();
    t.equal(data[0], 'db connected', 'connection');
    t.equal(typeof db[collections[0]].find, 'function', 'wrapper API');
    db.connection.close();
    t.end();
  });
});

