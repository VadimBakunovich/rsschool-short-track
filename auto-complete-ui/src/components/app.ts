import { appView } from './view/app/appView';
import { resultsView } from './view/resultsView';

export type func = (query: string) => string[];

export function app(container: HTMLElement, autoComplete: func) {
  appView(container);

  const input: HTMLInputElement = container.querySelector('.autocomplete__input');
  const resultsList: HTMLUListElement = container.querySelector('.autocomplete__list');
  let results: string[] = [];

  input.oninput = () => {
    resultsList.scrollTop = 0;
    resultsList.replaceChildren();
    results = autoComplete(input.value);
    resultsView(resultsList, results);
  };

  resultsList.onscroll = () => {
    const { scrollTop, offsetHeight, scrollHeight } = resultsList;
    if (scrollTop + offsetHeight >= scrollHeight) resultsView(resultsList, results);
  }
}
