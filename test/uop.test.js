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
            'a': 'a',
          },
        },
      ],
    }
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

  test('It returns false on empty object', () => {
    const isValid = uop({}, 'nested');
    expect(isValid).toBe(false);
  });

  test('It returns true on empty properties', () => {
    const isValid = uop(simpleNested, '');
    expect(isValid).toBe(true);
  });
  
  test('It returns true on non-undefined object property', () => {
    const isValid = uop(simpleNested, 'nested.nested')
    expect(isValid).toBe(true);
  });
  
  test('It returns true on non-undefined non-object property', () => {
    const isValid = uop(simpleNested, 'nested.nested.nested.a')
    expect(isValid).toBe(true);
  });
  
  test('It returns false on undefined property', () => {
    const isValid = uop(simpleNested, 'nested.nested.nested.nested');
    expect(isValid).toBe(false);
  });
  
  test('It returns false on undefined non-object property', () => {
    const isValid = uop(simpleNested, 'nested.nested.nested.b');
    expect(isValid).toBe(false);
  });
  
  test('It returns true on non-undefined property on array', () => {
    const isValid = uop(arrayNested, 'nested.nested[0].nested.a');
    expect(isValid).toBe(true);
  });

  test('It returns true on non-undefined property on array', () => {
    const isValid = uop(arrayNested, 'nested.nested[0].nested.a');
    expect(isValid).toBe(true);
  });

  test('It returns true on non-undefined property on empty array', () => {
    const objToTest = {
      'nested': {
        'arr': [],
      }
    };
    const onlyArrayProp = uop(objToTest, 'nested.arr');
    expect(onlyArrayProp).toBe(true);
  });

  test('It returns false on undefined index on empty array', () => {
    const objToTest = {
      'nested': {
        'arr': [],
      }
    };
    const onlyArrayProp = uop(objToTest, 'nested.arr[0]');
    expect(onlyArrayProp).toBe(false);
  });
  
  test('It returns true on non-undefined property with array-like name', () => {
    const objToTest = {
      'nested': {
        'nested[0]': 'a'
      }
    };
    
    const isValid = uop(objToTest, 'nested.nested[0]');
    expect(isValid).toBe(true);
  });
});