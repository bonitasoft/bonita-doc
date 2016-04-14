import NavigationController from './navigation.controller.js';
import test from 'ava';

test.beforeEach(t => {
 t.context.ctrl = new NavigationController([], {}, {}, {});
});

test(t => {
  t.true(true);
});
