
/**
 * New database
 *
 * @param {String} name - name of the database
 */

function lm (namespace) {
  if (!namespace) {
    throw new Error('Please provide a name for the db');
  }

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
 * @param {Object|Array} obj - object or array to be stored
 * @return {Object}
 * @api public
 */

lm.prototype.create = function(name) {
  if (!name) {
    throw new Error('Please specify a name');
  }

  // set the object
  var ns = db.retrieve(this.namespace);
  ns[name] = [];
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
 */

lm.prototype.remove = function(name) {
  if (!name) {
    throw new Error('Please specify a name');
  }

  // remove from the collections list
  var index = this.collections.indexOf(name);
  this.collections.splice(index, 1);

  // remove from the db
  var ns = db.retrieve(this.namespace);
  delete ns[name];
  db.store(this.namespace, ns);

  return this;
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
 * Find a record and remove
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Collection.prototype.findAndRemove = function() {

};

/**
 * Find by attribute
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Collection.prototype.findByAttr = function() {

};

/**
 * Find and update
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Collection.prototype.findAndUpdate = function() {

};


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
  if (typeof object == "string") {
    object = object && JSON.parse(object);
  }
  return object;
};

Storage.prototype.removeObject = function (key) {
  this.removeItem(key);
};
