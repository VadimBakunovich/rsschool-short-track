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

  
}