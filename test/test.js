
/**
 * qUnit tests
 */

/**
 * localStorage
 */
module('localStorage');
test('Support for localStorage', function () {
  expect(2);

  strictEqual(typeof window.localStorage, 'object', 'localStorage is present');
  strictEqual(!!window.localStorage, true, 'localStorage is supported');
})


/**
 * lm
 */

module('lm', {
  setup: function () {
    localStorage.clear();
  },
  teardown: function() {
    localStorage.clear();
  }
});
test('new lm("db-name") - Instantiate lm.js', function () {
  expect(1);

  var todoapp = new lm('todoapp');

  strictEqual(todoapp.constructor.name, 'lm', 'Instance is of the same type');
});
test('new lm() - Throw when no namespace is specified', function () {
  expect(1);

  throws(function() {
      var todoapp = new lm();
    },
    'Please provide a name for the db',
    'Raises an error'
  );
});


/**
 * Collection
 */

module('Collection', {
  setup: function () {
    localStorage.clear();
  },
  teardown: function() {
    localStorage.clear();
  }
});
test('create - Create a collection', function () {
  expect(5);

  var todoapp = new lm('todoapp');
  var list = todoapp.create('todos');

  var ls = localStorage.getObject('todoapp');

  strictEqual(list.constructor.name, 'Collection', 'Returns a Collection');
  strictEqual(ls.todos.length, 0, 'Todos list is empty');
  strictEqual(Array.isArray(ls.todos), true, 'Todos is an array');
  strictEqual(list.name, 'todos', 'Name of the list is todos');

  throws(function () {
    list.create();
  },
    'Please specify a name',
    'Throws when no name is given to the list'
  );
});
test('create - Create a collection and initialize it', function () {
  expect(2);

  var todoapp = new lm('todoapp');
  var todos = [
    { id: 1, name: 'shopping' },
    { id: 2, name: 'washing' }
  ];
  var list = todoapp.create('todos', todos);

  var ls = localStorage.getObject('todoapp');

  strictEqual(ls.todos.length, 2, 'Todos list is not empty');
  strictEqual(Array.isArray(ls.todos), true, 'Todos is an array');
});
test('add - Add a record to collection', function () {
  expect(4);

  var todoapp = new lm('todoapp');
  var list = todoapp.create('todos');
  list.add({ name: 'shopping' });

  var ls = localStorage.getObject('todoapp');

  strictEqual(ls.todos.length, 1, 'Todos list is not empty');
  strictEqual(Array.isArray(ls.todos), true, 'Todos is an array');
  strictEqual(ls.todos[0].name, 'shopping', 'Added record is stored');

  throws(function () {
    list.add();
  },
    'Expecting an object but got undefined',
    'Throws when no object is passed'
  );
});
test('add - Chain add methods', function () {
  expect(3);

  var todoapp = new lm('todoapp');
  var archived = todoapp
    .create('archived')
    .add({ name: 'shopping', tag: 'outside' })
    .add({ name: 'eating', tag: 'kitchen' })
    .add({ name: 'bathing', tag: 'inside' })
    .add({ name: 'cleaning', tag: 'kitchen' });

  var ls = localStorage.getObject('todoapp');

  strictEqual(ls.archived.length, 4, 'Todos list is not empty');
  strictEqual(Array.isArray(ls.archived), true, 'Archived is an array');
  strictEqual(ls.archived[0].name, 'shopping', 'Added record is stored');
});
test('remove - Remove a collection', function () {
  expect(3);

  var todoapp = new lm('todoapp');
  var list = todoapp.create('todos').add({ name: 'shopping' });
  todoapp.remove('todos');

  var ls = localStorage.getObject('todoapp');

  strictEqual(ls.todos, undefined, 'Todos is not defined');

  throws(function () {
    todoapp.remove('archived');
  },
    'Collection does not exist',
    'Throws when collection does not exist'
  );

  throws(function () {
    todoapp.remove();
  },
    'Collection does not exist',
    'Throws when no collection is passed'
  );
});
test('get - Get a collection', function () {
  expect(5);

  var todoapp = new lm('todoapp');
  todoapp.create('todos').add({ name: 'shopping' });

  var list = todoapp.get('todos');

  var ls = localStorage.getObject('todoapp');

  strictEqual(ls.todos.length, 1, 'Todos list is not empty');
  strictEqual(Array.isArray(ls.todos), true, 'Todos is an array');
  strictEqual(ls.todos[0].name, 'shopping', 'Added record is stored');
  strictEqual(list.constructor.name, 'Query', 'Returns a query instance');

  throws(function () {
    var archived = todoapp.get('archived');
  },
    'Collection does not exist',
    'Throws an error when collection does not exist and you are trying to get the collection'
  );

});


/*
// create collection
var list = todoapp.create('todos');

// add records to collection
list.add({ name: 'shopping' });

// even chain them
var archived = todoapp
  .create('archived')
  .add({ name: 'shopping', tag: 'outside' })
  .add({ name: 'eating', tag: 'kitchen' })
  .add({ name: 'bathing', tag: 'inside' })
  .add({ name: 'cleaning', tag: 'kitchen' });

// initialize collection while creating
var todos = [
  { id: 1, name: 'shopping' },
  { id: 2, name: 'washing' }
];
var list = todoapp.create('todos', todos);

// remove a collection
todoapp.remove('todos');

// get collection
var archived = todoapp.get('archived');

// find
archived.find({ tag: 'kitchen' }, function (docs) {
  console.log(docs);

  docs.find({ name: 'eating' }, function (records) {
    console.log(records);

    var doc = records[0]; // { name: 'eating', tag: 'kitchen' }

    doc.update({ name: 'cutting' });

    console.log(doc); // { name: 'cutting', tag: 'kitchen' }

    doc.remove();

    console.log(doc);
    // undefined

    console.log(localStorage.getObject('todoapp'));

  });
});
*/
