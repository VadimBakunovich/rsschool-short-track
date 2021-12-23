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

  
}