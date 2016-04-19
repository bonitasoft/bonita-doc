import NavigationController from './navigation.controller.js';
import test from 'ava';

test.beforeEach('', t => {
  t.context.taxonomy = ['widgets', 'bpm'];
  t.context.state = {};
  t.context.stateParams = {};
  t.context.properties = {};
});

test(t => {
  t.context.ctrl = new NavigationController(t.context.taxonomy, t.context.stateParams, t.context.properties, t.context.state);
});
