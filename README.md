## Moose
Some comman stuff which I reuse while building web & mobile apps

## Pre-requisites

jQuery

## API's

You need to change the `apiUrl` in `comman.js`

1. **GET('/path', callback)**

    ```js
    GET('/api/items', function (err, data) {
      if (err) return alert(err);
      cb(data);
    });
    ```
2. **POST('/path', data, callback)**

    ```js
    POST('/api/users', user, function (err, data) {
      if (err) return alert(err);
      cb(data);
    });
    ```
3. **$('form').serializeObject()**

    Serializes the form into
    ```
    { name1: 'value1',
      name2: 'value2',
      ...
    }
    ```

4. **db.store('key', object)**
5. **db.retrieve('key')**
6. **db.remove('key')**
7. **db.exists('key')**


## License
(The MIT License)

Copyright (c) 2012 Madhusudhan Srinivasa < [madhums8@gmail.com](mailto:madhums8@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
