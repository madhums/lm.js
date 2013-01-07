
var db = {};

/**
 * localStorage functions to set, get and remove objects
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
