[![npm version](https://badge.fury.io/js/miffo.svg)](https://badge.fury.io/js/miffo)

# miffo
Wrapper for the mongodb native driver in node.js. Trying to stay as close as possible to the shell API.

# Features
- Use as a simple wrapper or with [konstapel](https://github.com/karlpokus/konstapel) for authentication middleware.
- Uses [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/) to hash passwords.
- See [the mongodb docs](https://github.com/mongodb/node-mongodb-native) for a complete syntax.

# Install
```
$ npm install miffo
```

# Usage
```javascript
var Miffo = require('miffo'),
    url = 'mongodb://user:pwd@url:port/db',
    collections = ['users', 'items'],
    db = new Miffo(url, collections);

// connect
db.start(); // will log on success and throw otherwise

// wrapper API
db[collectionName].query({selectors}, {projections}, cb(err, data));

// Methods
db.oid() // new mongo-style ObjectID
db.oid(id) // ObjectID from string
oid.toHexString() // hex from ObjectID
db.bcrypt.hash() // hash pwd (See bcrypt for details)
db.bcrypt.compare() // compare pwds

// close
db.connection.close(); // the return object from connect is stored on db.connection
```

# Todos
- tests

# Licence
MIT
