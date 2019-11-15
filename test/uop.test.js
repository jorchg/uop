const uop = require('..');

describe('Uop use cases', () => {

  const simpleNested = {
    'nested': {
      'nested': {
        'nested': {
          'a': 'a',
        },
      },
    },
  };

  const arrayNested = {
    'nested': {
      'nested': [
        {
          'nested': {
            'a': 'a',
          },
        },
        {
          'nested': {
            'a': 'b',
          },
        },
      ],
    },
  };

  const nullNested = {
    'nested:': {
      null: {
        'nested': {
          'a': 'a',
        },
      },
    },
    null: {
      'nested': {
        'a': 'a',
      },
    },
  };

  const simpleNull = {
    null: null,
  };

  const nullString = {
    null: 'null',
  };

  const nullAsString = {
    'null': null,
  };

  const undefinedNested = {
    'nested': {
      undefined: {
        'nested': {
          'a': 'a',
        },
      },
    },
  };

  test('It throws a TypeError if first argument is not an object', () => {
    expect(() => {
      uop('im-not-an-object');
    }).toThrow(TypeError);
  });
  
  test('It throws a TypeError if second argument is not a string', () => {
    expect(() => {
      uop({}, {});
    }).toThrow(TypeError);
  });

  test('It returns null on empty object', () => {
    const isValid = uop({}, 'nested');
    expect(isValid).toBe(null);
  });

  test('It throws a TypeError if first argument is not an object', () => {
    expect(() => {
      uop(null, 'a');
    }).toThrow(TypeError);
  });

  test('It returns the object on empty properties', () => {
    const isValid = uop(simpleNested, '');
    expect(isValid).toBe(simpleNested);
  });
  
  test('It returns the value on non-undefined object property', () => {
    const value = {
      'nested': {
        'a': 'a',
      },
    };
    const isValid = uop(simpleNested, 'nested.nested');
    expect(isValid).toStrictEqual(value);
  });
  
  test('It returns the value on non-undefined non-object property', () => {
    const isValid = uop(simpleNested, 'nested.nested.nested.a')
    expect(isValid).toBe('a');
  });
  
  test('It returns null on undefined property', () => {
    const isValid = uop(simpleNested, 'nested.nested.nested.nested');
    expect(isValid).toBe(null);
  });
  
  test('It returns null on undefined non-object property', () => {
    const isValid = uop(simpleNested, 'nested.nested.nested.b');
    expect(isValid).toBe(null);
  });
  
  test('It returns value on non-undefined property on array', () => {
    const isValid = uop(arrayNested, 'nested.nested[0].nested.a');
    expect(isValid).toBe('a');
  });

  test('It returns value on non-undefined property on array', () => {
    const isValid = uop(arrayNested, 'nested.nested[1].nested.a');
    expect(isValid).toBe('b');
  });

  test('It returns null on undefined index on empty array', () => {
    const objToTest = {
      'nested': {
        'arr': [],
      }
    };
    const onlyArrayProp = uop(objToTest, 'nested.arr[0]');
    expect(onlyArrayProp).toBe(null);
  });

  test('It returns empty array on non-undefined property on empty array', () => {
    const objToTest = {
      'nested': {
        'arr': [],
      }
    };
    const onlyArrayProp = uop(objToTest, 'nested.arr');
    expect(onlyArrayProp).toStrictEqual([]);
  });
  
  test('It returns value on non-undefined property with array-like name', () => {
    const objToTest = {
      'nested': {
        'nested[0]': 'a'
      }
    };
    
    const isValid = uop(objToTest, 'nested.nested[0]');
    expect(isValid).toStrictEqual('a');
  });

  test('It returns null on parent null nested property', () => {
    const isNull = uop(nullNested, 'nested.nested.a');
    expect(isNull).toBe(null);
  });

  test('It returns null on null property', () => {
    expect(() => {
      uop(simpleNull, null);
    }).toThrow(TypeError);
  });

  test('It returns null on null', () => {
    expect(() => {
      uop(null, null);
    }).toThrow(TypeError);
  });

  test('It returns null on nullString', () => {
    expect(() => {
      uop(nullString, null);
    }).toThrow(TypeError);
  });

  test('It returns null on nullAsString', () => {
    expect(() => {
      uop(nullAsString, null);
    }).toThrow(TypeError);
  });
});