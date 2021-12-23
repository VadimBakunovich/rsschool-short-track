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

  
}