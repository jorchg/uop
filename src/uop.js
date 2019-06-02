function couldBeArrayProp(prop) {
  return  prop.includes('[') && prop.includes(']');
}

function getPropertyIndexFromPropName(propName) {
  return parseInt(propName.split('[')[1].split(']'), 10);
}

function getPropertyNameFromNameAndIndex(prop) {
  return prop.split('[')[0];
}

function checkIfPropIsArray(obj, prop) {
  return ((typeof (obj[prop]) === 'object') && (obj[prop].length !== undefined));
}

export default function checkProperties(obj, properties) {
  const props = properties.split('.');
  const propsLength = props.length;
  const prop = props.shift();

  const mayPropBeAnArray = couldBeArrayProp(prop);

  if (mayPropBeAnArray) {
    const index = getPropertyIndexFromPropName(prop);
    const propName = getPropertyNameFromNameAndIndex(prop);
    const isArrayProp = checkIfPropIsArray(obj, propName);
    if (isArrayProp) {
      if (obj[propName][index] === undefined) return false;
      return checkProperties(obj[propName][index], props.join('.'));
    }
  }

  if ((obj[prop] !== undefined) && (propsLength === 1)) return true;
  if (obj[prop] === undefined) return false;
  return checkProperties(obj[prop], props.join('.'));
}
