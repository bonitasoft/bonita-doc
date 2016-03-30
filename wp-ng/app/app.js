import 'jquery';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';

import 'marked';
import 'angular-marked';

import 'services/services';
import 'directives/directives';

import mainRoutes from 'components/main/main.routes';

angular.module('bonita-doc', ['ui.router', 'services', 'directives', 'ngSanitize', 'hc.marked'])

.config(mainRoutes);
