import SearchController from './search.controller.js';
import test from 'ava';
import taxonomy from '../../taxonomy.json';
import searchResults from '../../searchResults.json';

test.beforeEach('', t => {
  t.context.taxonomy = taxonomy;
  t.context.state = {};
  t.context.stateParams = {};
  t.context.currentVersion = {};
  t.context.searchResults = searchResults;
});

test(t => {
  t.context.ctrl = new SearchController(t.context.searchResults, t.context.stateParams, t.context.state, t.context.currentVersion, t.context.taxonomy);
});
