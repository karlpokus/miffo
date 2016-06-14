var mongo = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    bcrypt = require('bcrypt');

var DB = module.exports = function(url, collections) {
  if (!url || !collections) {
    throw new Error("Missing args");
  }

  this.opts = {
    url: url,
    collections: collections
  };
  this.oid = ObjectId;
  this.bcrypt = bcrypt;
}

DB.prototype.start = function() {
  var self = this;

  mongo.connect(self.opts.url, function(err, db) {
    if (err) throw err;
    console.log("Db connected");

    self.opts.collections.forEach(function(c){
      self[c] = db.collection(c);
    });

    self.connection = db; // for db.connection.close();
  });
}
