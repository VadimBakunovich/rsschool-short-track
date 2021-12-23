class CustomLodash {

  arrPush = (arr, elem) => arr[arr.length] = elem;

  arrSlice(arr, start, end) {
    const slicedArr = [];
    if (end > arr.length) end = arr.length;
    if (start < 0) start = 0;
    for (let i = start; i < end; i++) {
      this.arrPush(slicedArr, arr[i]);
    }
    return slicedArr;
  }

  chunk(arr, size = 1) {
    if (size < 1) return [];
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      this.arrPush(chunks, this.arrSlice(arr, i, (i + size)));
    }
    return chunks;
  }

  compact(arr) {
    const resultArr = [];
    for (const el of arr) {
      if (el) this.arrPush(resultArr, el);
    }
    return resultArr;
  }

  drop(arr, n = 1) {
    if (n < 0) n = 0;
    return this.arrSlice(arr, n, arr.length);
  }

  arrWhile(arr, predicate) {
    let idx = 0;
    for (; idx < arr.length; idx++) {
      if (!predicate(arr[idx], idx, arr)) break;
    }
    return this.arrSlice(arr, idx, arr.length);
  }

  identity = value => value;
  
  dropWhile(arr, predicate = this.identity) {
    return (arr && arr.length)
      ? this.arrWhile(arr, predicate)
      : [];
  }

  take(arr, n = 1) {
    if (n < 0) n = 0;
    return this.arrSlice(arr, 0, n);
  }

  getValue = key => obj => obj[key];

  matchObj = srcObj => obj => {
    for (const key in srcObj) {
      if (obj[key] !== srcObj[key]) return false;
    }
    return true;
  }

  matchObjValue = (key, value) => obj => obj[key] !== value ? false : true;

  iteratee(value) {
    if (!value) return this.identity;
    if (typeof value === 'function') return value;
    if (typeof value === 'object') {
      return Array.isArray(value)
        ? this.matchObjValue(value[0], value[1])
        : this.matchObj(value);
    }
    return this.getValue(value);
  }

  findArrElem(arr, predicate = this.identity, fromIdx) {
    const resultArr = [];
    let idx = fromIdx ? fromIdx : 0;
    for (; idx < arr.length; idx++) {
      if (predicate(arr[idx], idx, arr)) {
        if (fromIdx !== undefined) return arr[idx];
        this.arrPush(resultArr, arr[idx]);
      }
    }
    return resultArr;
  }

  filter(arr, predicate = this.identity) {
    return this.findArrElem(arr, this.iteratee(predicate));
  }

  find(arr, predicate = this.identity, fromIdx = 0) {
    if (fromIdx < 0) fromIdx = 0;
    return this.findArrElem(arr, predicate, fromIdx);
  }

  includes(collection, value, fromIdx = 0) {
    if (typeof collection === 'string') {
      const regExp = new RegExp(value);
      return regExp.test(collection);
    } else if (collection instanceof Object) {
      collection = Object.values(collection);
    }
    const length = collection.length;
    if (fromIdx < 0) fromIdx = Math.max(length + fromIdx, 0);
    for (let idx = fromIdx; idx < length; idx++) {
      if (collection[idx] === value) return true;
    }
    return false;
  }

  map(collection, predicate = this.identity) {
    const resultArr = [];
    if (collection instanceof Object) {
      collection = Object.values(collection);
    }
    for (let idx = 0; idx < collection.length; idx++) {
      resultArr[idx] = predicate(collection[idx], idx, collection);
    }
    return resultArr;
  }

  zip(...arrays) {
    let resultArr = [];
    let maxLength = arrays[0].length;
    for (let idx = 1; idx < arrays.length; idx++) {
      maxLength = Math.max(maxLength, arrays[idx].length);
    }
    for (let i = 0; i < maxLength; i++) {
      resultArr[i] = [];
      for (let j = 0; j < arrays.length; j++) {
        this.arrPush(resultArr[i], arrays[j][i]);
      }
    }
    return resultArr;
  }

  merge(obj = {}, ...sources) {
    for (const src of sources) {
      for (const key in src) {
        if (key in obj) {
          typeof obj[key] === "object"
            ? this.merge(obj[key], src[key])
            : obj[key] = src[key];
        } else obj[key] = src[key];
      }
    }
    return obj;
  }

  
}