import { createAutoComplete } from '../../auto-complete';
import data from './cities.json';
import { app } from './components/app';
import type { func } from './components/app';

app(document.body, createAutoComplete(data) as func);
