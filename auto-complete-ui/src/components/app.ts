import { appView } from './view/app/appView';
import { resultsView } from './view/resultsView';

type innerFunc = (query: string) => string[];
export type outerFunc = (data: string[]) => innerFunc;

export function app(
  container: HTMLElement,
  createAutoComplete: outerFunc,
  data: string[]
  ) {
  appView(container);

  const input: HTMLInputElement = container.querySelector('.autocomplete__input');
  const resultsList: HTMLUListElement = container.querySelector('.autocomplete__list');
  const autoComplete = createAutoComplete(data);
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
