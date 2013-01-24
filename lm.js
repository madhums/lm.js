
/*!
 * lm.js
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

var debug = true;

/**
 * New database
 *
 * @param {String} name - name of the database
 * @param {Object} options - options
 *
 * Example
 *   var todoapp = new lm('todoapp', {
 *     debug: false
 *   });
 *
 */

function lm (namespace, options) {
  if (!namespace) {
    throw new Error('Please provide a name for the db');
  }

  var _options = {
    debug: true
  };

  this.options = options || _options;
  debug = this.options.debug;

  // create a namespaced object
  db.store(namespace, {});

  this.namespace = namespace;
  this.collections = [];
}

/**
 * Create a collection within the namespace
 *
 * A collection is just an Array within the namespace of db
 *
 * @param {String} name - name of the collection
 * @param {Array} arr - collection of objects
 * @return {Object}
 * @api public
 *
 * Example
 *   var todos = todoapp.create('todos');
 *   var todos = todoapp.create('todos', [
 *     {id: 1, name: 'shopping'},
 *     {id: 2, name: 'washing'}
 *   ]);
 */

lm.prototype.create = function(name, arr) {
  if (!name) {
    throw new Error('Please specify a name');
  }

  // set the object
  var ns = db.retrieve(this.namespace);
  ns[name] = arr || [];
  db.store(this.namespace, ns);

  this.collections.push(name);

  return new Collection(name, this.namespace);
};

/**
 * Remove a collection
 *
 * @param {String} name
 * @return {Object}
 * @api public
 *
 * Example
 *   todoapp.remove('todos');
 */

lm.prototype.remove = function(name) {
  if (!name) {
    throw new Error('Please specify a name');
  }

  // remove from the collections list
  var index = this.collections.indexOf(name);

  // if not found, return
  if (index < 0) {
    log(name + ' collection does not exist');
    return this;
  }

  this.collections.splice(index, 1);

  // remove from the db
  var ns = db.retrieve(this.namespace);
  delete ns[name];
  db.store(this.namespace, ns);

  return this;
};

/**
 * Get a collection
 *
 * @param {String} name
 * @return {Object}
 * @api public
 *
 * Example
 *   var archived = todoapp.get('archived');
 */

lm.prototype.get = function(name) {
  if (!name) {
    throw new Error('Please specify a name');
  }

  // remove from the collections list
  var index = this.collections.indexOf(name);

  // if not found, return
  if (index < 0) {
    throw new Error('Collection does not exist');
  }

  return new Query(this.namespace, name);
};


/**
 * Collection
 *
 * @param {String} name
 * @api public
 */

function Collection (name, namespace) {
  this.name = name;
  this.namespace = namespace;
}

/**
 * Add a record to the collection
 *
 * @param {Object} record
 * @return {Object}
 * @api public
 *
 * Example
 *   var todos = todoapp.create('todos');
 *   todos.add({
 *     { id: 1, name: 'shopping' }
 *   })
 *
 *   // you can also chain them
 *   var archived = todoapp.create('archived').add({ name: 'eating' });
 */

Collection.prototype.add = function(record) {
  if (typeof record !== 'object') {
    throw new Error('Expecting an object but got '+ typeof record)
  }

  var ns = db.retrieve(this.namespace);
  ns[this.name].push(record);
  db.store(this.namespace, ns);

  return this;
};


/**
 * Query
 *
 * @param {String} namespace
 * @param {String} name - name of the collection
 * @return {Object}
 * @api public
 */

function Query (namespace, name) {
  this.namespace = namespace;
  this.collectionName = name;
}

/**
 * Find
 *
 * @param {Object} criteria
 * @param {Function} callback - callback function
 * @return {Object}
 * @api public
 *
 * Example
 *   archived.find({ tag: 'kitchen' }, function (err, docs) {
 *     // do some stuff
 *   })
 */

Query.prototype.find = function(criteria, callback) {
  if (!arguments.length) {
    throw new Error('Please specify a criteria or a callback');
  }

  if (typeof criteria === 'function') {
    // return the whole collection
    callback = criteria;
    criteria = {};
  }

  var ns = db.retrieve(this.namespace);
  var collection = ns[this.collectionName];

  // no criteries given, so return the whole collection
  if (!Object.keys(criteria).length) {
    callback(collection);
  } else {
    var keys = Object.keys(criteria);

    // filter the collection with the given criterias
    var result = collection.filter(function (doc) {
      // loop over criteria
      for (var i = keys.length - 1; i >= 0; i--) {
        if (doc[keys[i]] === criteria[keys[i]]) {
          return true;
        }
      };

    });

    // change the prototype of result
    result.__proto__ = Query.prototype;

    callback(null, result);
  }

  return this;
};

/**
 * Find one
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Query.prototype.findOne = function() {

};

/**
 * Find a record and remove
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Query.prototype.findAndRemove = function() {

};


/**
 * Document methods
 *
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

Document.prototype.update = function (obj) {

}


var db = {}

/**
 * Alias function for localStorage.setObject
 *
 * @param {String} key - name of the object
 * @param {Object} object - object that needs to be stored
 * @api public
 */

db.store = function (key, object) {
  localStorage.setObject(key, object);
};

/**
 * Alias function for localStorage.getObject
 *
 * @param {String} key - name of the object to retrieve
 * @return {Object}
 * @api public
 */

db.retrieve = function (key) {
  return localStorage.getObject(key);
};

/**
 * Alias function for localStorage.removeObject
 *
 * @param {String} key - name of the object to remove
 * @api public
 */

db.remove = function () {
  localStorage.removeObject(key);
};

/**
 * Check if the given key exists in localStorage
 *
 * @param {String} key - object that needs to be checked for existence
 * @return {Boolean}
 * @api public
 */

db.exists = function (key) {
  var obj = localStorage.getObject(key);
  return !!obj && !!Object.keys(obj).length;
};

/**
 * Clear localstorage
 *
 * @api public
 */

db.clear = function () {
  localStorage.clear();
}


/**
 * Some generic localStorage get and set Object methods
 */

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  var object = value && JSON.parse(value);
  // Firefox fix.
  if (typeof object == 'string') {
    object = object && JSON.parse(object);
  }
  return object;
};

Storage.prototype.removeObject = function (key) {
  this.removeItem(key);
};


/**
 * log to console
 */

function log (message) {
  if (debug) console.log(message);
}

