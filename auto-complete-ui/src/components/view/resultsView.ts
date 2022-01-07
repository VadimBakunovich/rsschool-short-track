export function resultsView(resultsList: HTMLUListElement, results: string[]) {
  const { length } = resultsList.children;
  const increment = 13;
  let content = '';
  
  for (let i = length; i < length + increment; i++) {
    if (i < results.length) {
      content += `<li class="autocomplete__item">${results[i]}</li>`;
    }
  }
  resultsList.insertAdjacentHTML('beforeend', content);
}
