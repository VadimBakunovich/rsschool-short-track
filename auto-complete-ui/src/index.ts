import { createAutoComplete } from '../../auto-complete';
import data from './cities.json';
import { app } from './components/app';
import type { outerFunc } from './components/app';

app(document.body, createAutoComplete as outerFunc, data);
