/**
 * Autocomplete module.
 * @module ./src/index
 */
/**
 * Create function autocomplete.
 * @param {array} data - The dictionary.
 * @param {array} prevRes - Previous search result.
 * @param {string} prevQuery - Previous query.
 * @returns {function}
 */
exports.createAutoComplete = (data, prevRes = [], prevQuery = '') => 

  /**
   * Find all items starting with a query.
   * @param {string} query - Current query.
   * @returns {array}
   */
  query => {

    if (!query) return [];
    if (prevQuery === query) return prevRes;
    
    const words = prevQuery && query.startsWith(prevQuery) ? prevRes : data;

    /**
     * Find the index of the first(last) entry, that starts with the given substring.
     * @param {array} words - The dictionary.
     * @param {string} query - The given query.
     * @param {boolean} isFirst - The type of index to look for (true: first, false: last).
     * @returns {number}
     */
    const findEntryIdx = (words, query, isFirst) => {
      let startIdx = 0;
      let stopIdx = words.length - 1;
      let middle = Math.floor((stopIdx + startIdx) / 2);
      const queryLowCase = query.toLowerCase();
      
      while(startIdx <= stopIdx) {
        const substringLowCase = words[middle].toLowerCase().slice(0, query.length);
        if (isFirst && substringLowCase >= queryLowCase) stopIdx = middle - 1;
        else if (!isFirst && substringLowCase > queryLowCase) stopIdx = middle - 1;
        else startIdx = middle + 1;
        middle = Math.floor((stopIdx + startIdx) / 2);
      }
      return ++middle;
    };

    const fistEntryIdx = findEntryIdx(words, query, true);
    const lastEntryIdx = findEntryIdx(words, query, false);
    const result = words.slice(fistEntryIdx, lastEntryIdx);

    prevQuery = query;
    prevRes = result;
    return result;
  };
