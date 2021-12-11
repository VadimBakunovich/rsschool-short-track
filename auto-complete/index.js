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
     * @param {array} items - The dictionary.
     * @param {string} subs - The given substring (query).
     * @returns {number}
     */
    const findFirstEntryIdx = (items, subs) => {
      let startIdx  = 0;
      let stopIdx = items.length - 1;
      let middle = Math.floor((stopIdx + startIdx) / 2);
      const subsLC = subs.toLowerCase();
      
      while(startIdx < stopIdx) {
        const itemSubsLC = items[middle].toLowerCase().substring(0, subsLC.length);
        if (itemSubsLC >= subsLC) stopIdx = middle - 1;
        else startIdx = middle + 1;
        middle = Math.floor((stopIdx + startIdx) / 2);
      }
      return items[middle] && items[middle].toLowerCase().startsWith(subsLC)
        ? middle
        : ++middle;
    };

    /**
     * Find the index of the last entry, that starts with the given substring.
     * @param {array} items - The dictionary.
     * @param {string} subs - The given substring (query).
     * @returns {number}
     */
    const findLastEntryIdx = (items, subs) => {
      let startIdx  = 0;
      let stopIdx = items.length - 1;
      let middle = Math.floor((stopIdx + startIdx) / 2);
      const subsLC = subs.toLowerCase();
      
      while(startIdx < stopIdx) {
        const itemSubsLC = items[middle].toLowerCase().substring(0, subsLC.length);
        if (itemSubsLC > subsLC) stopIdx = middle - 1;
        else startIdx = middle + 1;
        middle = Math.floor((stopIdx + startIdx) / 2);
      }
      return items[middle].toLowerCase().startsWith(subsLC)
        ? middle
        : --middle;
    };

    const queryLC = query.toLowerCase();
    const fistEntryIdx = findFirstEntryIdx(words, query);
    const lastEntryIdx = findLastEntryIdx(words, query);
    const result = words.length > 2
      ? words.slice(fistEntryIdx, lastEntryIdx + 1)
      : words.filter(word => word.toLowerCase().startsWith(queryLC));

    prevQuery = query;
    prevRes = result;
    return result;
  };
