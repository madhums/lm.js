## lm.js

A simple wrapper around `localStorage` with which you can store, query and perform CRUD operations on collections and documents in an easy way.

## Usage

Include lm.js in head or tail of your html.

```html
<script type="text/javascript" src="https://raw.github.com/madhums/lm.js/master/lm.js"></script>
```

## Example

```js
var todoapp = new lm('todoapp');

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

    console.log(doc.name);
    // undefined
  });
});
```

## Tests
To run tests open the `index.html` or click [here](http://madhums.me/public/lm.js/).

## License
(The MIT License)

Copyright (c) 2013 Madhusudhan Srinivasa < [madhums8@gmail.com](mailto:madhums8@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
