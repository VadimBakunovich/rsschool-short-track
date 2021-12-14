/**
 * Autocomplete module.
 * @module ./src/index
 */
/**
 * Create function autocomplete.
 * @param {array} words - The dictionary.
 * @param {array} prevRes - Previous search result.
 * @param {string} prevQuery - Previous query.
 * @returns {function}
 */
exports.createAutoComplete = (words, prevRes = [], prevQuery = '') => 

  /**
   * Find all items starting with a query.
   * @param {string} query - Current query.
   * @returns {array}
   */
  query => {

    if (!query) return [];
    if (prevQuery === query) return prevRes;
    if (prevQuery && query.startsWith(prevQuery)) words = prevRes;

    /**
     * Find the index of the first entry, that starts with the given substring.
     * @param {array} words - The dictionary.
     * @param {string} query - The given query.
     * @returns {number}
     */
    const findFirstEntryIdx = (words, query) => {
      let startIdx  = 0;
      let stopIdx = words.length - 1;
      let middle = Math.floor((stopIdx + startIdx) / 2);
      const queryLowCase = query.toLowerCase();
      
      while(startIdx <= stopIdx) {
        const substringLowCase = words[middle].toLowerCase().substring(0, queryLowCase.length);
        if (substringLowCase >= queryLowCase) stopIdx = middle - 1;
        else startIdx = middle + 1;
        middle = Math.floor((stopIdx + startIdx) / 2);
      }
      return ++middle;
  };

    /**
     * Find the index of the last entry, that starts with the given substring.
     * @param {array} words - The dictionary.
     * @param {string} query - The given query.
     * @param {number} startIdx - The search start index.
     * @returns {number}
     */
    const findLastEntryIdx = (words, query, startIdx = 0) => {
      let stopIdx = words.length - 1;
      let middle = Math.floor((stopIdx + startIdx) / 2);
      const queryLowCase = query.toLowerCase();
        
      while(startIdx <= stopIdx) {
        const substringLowCase = words[middle].toLowerCase().substring(0, queryLowCase.length);
        if (substringLowCase > queryLowCase) stopIdx = middle - 1;
        else startIdx = middle + 1;
        middle = Math.floor((stopIdx + startIdx) / 2);
      }
      return ++middle;
    };

    const fistEntryIdx = findFirstEntryIdx(words, query);
    const lastEntryIdx = findLastEntryIdx(words, query, fistEntryIdx);
    const result = words.slice(fistEntryIdx, lastEntryIdx);

    prevQuery = query;
    prevRes = result;
    return result;
  };
