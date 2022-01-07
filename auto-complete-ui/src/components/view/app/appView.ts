import './appView.css';

export function appView(container: HTMLElement) {
  container.classList.add('container');
  container.innerHTML = `
    <p class="autocomplete__title">Autocomplete search</p>
    <input class="autocomplete__input" placeholder="Please enter your search text">
    <ul class="autocomplete__list"></ul>
  `;
}
