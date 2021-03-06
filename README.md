# UOP

[![Build Status](https://travis-ci.org/jorchg/uop.svg?branch=master)](https://travis-ci.org/jorchg/uop)
[![Coverage Status](https://coveralls.io/repos/github/jorchg/uop/badge.svg?branch=master)](https://coveralls.io/github/jorchg/uop?branch=master)

**UOP** stands for **Undefined Object Properties** and is a tiny library which works on Node and browser which simply checks for undefined properties or nested properties on objects. We all have seen even in highly-skilled developers groups checking for undefined properties like:

```js
if (
  obj &&
  obj.nested &&
  obj.nested.datetime &&
  obj.nested.datetime.time &&
  obj.nested.datetime.time.hours &&
  obj.nested.datetime.time.hours.stringFormat
) return true;
```

This is awful and we all should avoid it. It is frequently common also the other way, not checking all of the nested properties on an object which produce `TypeError` and crash your application. With **UOP** we can do:

```js
if (uop(obj, 'nested.datetime.time.hours.stringFormat')) return true
```
And it will just return the value of the property if all nested properties are not undefined on the object or `null` if any of them are. If so, you should be responsible for finding out which of the properties is causing a problem, because actually **UOP** does not provide this functionality.


## Getting started
- Using the library
```bash
npm i --save @jorchgg/uop
```
```js
const uop = require('@jorchgg/uop');
const assert = require('assert');

const objWithNestedProperties = {
  'nested': {
    'datetime': {
      'time': {
        'hours': {
          'stringFormat': 'Sun, 02 Jun 2019 17:40:59 GMT',
        },
      },
    }, 
  },
};

assert.strictEqual(uop(objWithNestedProperties, 'nested.datetime.time.hours.stringFormat'), 'Sun, 02 Jun 2019 17:40:59 GMT');
assert.strictEqual(uop(objWithNestedProperties, 'nested.inexistentProp.time.hours.stringFormat'), null);

// It also supports arrays
const objWithNestedArray = {
  'nested': {
    'hours': [
      {
        'first': 9,
      },
      {
        'second': 10
      },
    ],
  },
};

assert.strictEqual(uop(objWithNestedArray, 'nested.hours[0].first'), 9);
assert.strictEqual(uop(objWithNestedArray, 'nested.hours[1].second'), 10);
assert.strictEqual(uop(objWithNestedArray, 'nested.hours[2].first'), null);
```

- Running the tests
`npm test` builds the library, then tests it.

## License

[MIT](LICENSE).
