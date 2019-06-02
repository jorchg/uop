import checkProperties from './uop';

export default function uo(obj = {}, properties = '') {
  if (typeof (obj) !== 'object') throw new TypeError('Object to check is not an object');
  if (typeof (properties) !== 'string') throw new TypeError('Properties must be a string in dot notation. Ex: \'time.hours.string\'');
  if (obj && properties === '') return true;
  return checkProperties(obj, properties);
}