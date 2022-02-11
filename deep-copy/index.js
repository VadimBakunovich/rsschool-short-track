/**
 * Creates a deep copy of an object or array.
 * Returns other data types unchanged.
 * Doesn't work correctly with constructors ​​(ex. new Date ()) and regExp (ex. /.\D/).
 * @param {any} obj 
 * @returns {any}
 */
const copy = obj => {
  if (typeof obj !== 'object' || !obj) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(item => copy(item));
  }
  const objCopy = {};
  for (const key in obj) {
    objCopy[key] = copy(obj[key]);
  }
  return objCopy;
}
