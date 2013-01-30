
/**
 * qUnit tests
 */

test('Instantiate lm.js', function () {
  var todoapp = new lm('todoapp');
  strictEqual(todoapp.constructor.name, 'lm', 'The instance is of the same type');
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
