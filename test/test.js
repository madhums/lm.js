
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


/**
 * Query
 */

module('Query', {
  setup: function () {
    localStorage.clear();
  },
  teardown: function() {
    localStorage.clear();
  }
});
test('find - get filtered list from collection', function () {
  expect(4);

  var todoapp = new lm('todoapp');
  var old = [
    { name: 'shopping', tag: 'outside' },
    { name: 'eating', tag: 'kitchen' },
    { name: 'bathing', tag: 'inside' },
    { name: 'cleaning', tag: 'kitchen' }
  ];
  todoapp.create('archived', old);
  var archived = todoapp.get('archived');

  var ls = localStorage.getObject('todoapp');

  archived.find({ tag: 'kitchen' }, function (docs) {
    strictEqual(docs.length, 2, 'There should be two documents with matching criteria');
    strictEqual(docs instanceof Query, true, 'docs should be instance of Query');
  });

  archived.find({ name: 'eating', tag: 'kitchen' }, function (docs) {
    strictEqual(docs.length, 1, 'There should be one document with matching criteria');
  });

  archived.find({}, function (docs) {
    strictEqual(docs.length, 4, 'Should return all the documents when no criteria is provided');
  });
});


/**
 * Document
 */

module('Document', {
  setup: function () {
    localStorage.clear();
  },
  teardown: function() {
    localStorage.clear();
  }
});
test('update - update a document in the collection', function () {
  expect(4);

  var todoapp = new lm('todoapp');
  var old = [
    { name: 'shopping', tag: 'outside' },
    { name: 'eating', tag: 'kitchen' },
    { name: 'bathing', tag: 'inside' },
    { name: 'cleaning', tag: 'kitchen' }
  ];
  todoapp.create('archived', old);
  var archived = todoapp.get('archived');

  archived.find({ tag: 'kitchen' }, function (docs) {
    var doc = docs[0];
    var oldName = doc.name;

    doc.update({ name: 'cycling' });

    var ls = localStorage.getObject('todoapp');

    strictEqual(doc.name, 'cycling', 'Should update the name');
    notStrictEqual(doc.name, oldName, 'Should not be the same');

    var list = ls.archived.filter(function (todo) {
      return todo.name === 'cycling';
    });
    var updated = list[0];

    strictEqual(doc instanceof Document, true, 'doc should be instance of Document');
    strictEqual(doc.name, updated.name, 'Document should be updated in localStorage');
  });
});
test('remove - remove a document from a collection', function () {
  expect(2);

  var todoapp = new lm('todoapp');
  var old = [
    { name: 'shopping', tag: 'outside' },
    { name: 'eating', tag: 'kitchen' },
    { name: 'bathing', tag: 'inside' },
    { name: 'cleaning', tag: 'kitchen' }
  ];
  todoapp.create('archived', old);
  var archived = todoapp.get('archived');

  archived.find({ tag: 'kitchen' }, function (docs) {
    var doc = docs[0];
    var oldName = doc.name;

    doc.remove();

    var ls = localStorage.getObject('todoapp');

    strictEqual(doc.name, undefined, 'Should be undefined once removed');

    var list = ls.archived.filter(function (todo) {
      return oldName === todo.name;
    });

    strictEqual(list.length, 0, 'The document should be removed from localStorage');
  });
});
