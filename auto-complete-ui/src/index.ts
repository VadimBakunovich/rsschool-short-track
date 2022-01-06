import { createAutoComplete } from '../../auto-complete';
import data from './cities.json';
import './style.css';

document.body.innerHTML = `
  <header class="header">
    <h1 class="title">Autocomplete search</h1>
    <input class="input" placeholder="Please enter your search text">
  </header>
  <ul class="list"></ul>
`;

const input: HTMLInputElement = document.querySelector('.input');
const resultsList: HTMLElement = document.querySelector('.list');
const autoComplete = createAutoComplete(data);
let results: string[] = [];

const renderResults = () => {
  const { length } = resultsList.children;
  const increment = 13;
  let content = '';
  
  for (let i = length; i < length + increment; i++) {
    if (i < results.length) {
      content += `<li class="item">${results[i]}</li>`;
    }
  }
  resultsList.insertAdjacentHTML('beforeend', content);
}

input.oninput = () => {
  resultsList.scrollTop = 0;
  resultsList.replaceChildren();
  results = autoComplete(input.value) as string[];
  renderResults();
};

resultsList.onscroll = () => {
  const { scrollTop, offsetHeight, scrollHeight } = resultsList;
  if (scrollTop + offsetHeight >= scrollHeight) renderResults();
}
