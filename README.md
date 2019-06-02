# UOP

[![Build Status](https://travis-ci.org/jorchg/uop.svg?branch=master)](https://travis-ci.org/jorchg/uop)
[![Coverage Status](https://coveralls.io/repos/github/jorchg/uop/badge.svg?branch=master)](https://coveralls.io/github/jorchg/uop?branch=master)

**UOP** is a tiny library which works on Node and browser which simply checks for undefined properties or nested properties on objects. We all have seen even in highly-skilled developers groups checking for undefined properties like:

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
And it will just return `true` if all properties are not undefined on the object or false if any of them are. If so, you should be responsible for finding out which of the properties is causing a problem, because actually **UOP** does not provide this functionality.

## Getting started
`npm test` builds the library, then tests it.

## License

[MIT](LICENSE).
