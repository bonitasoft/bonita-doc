import 'jquery';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';

import 'services/services';
import directives from 'directives/directives';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import uiBootstrap from 'angular-ui-bootstrap';
import uiTree from 'angular-ui-tree';
import 'angular-ui-tree/dist/angular-ui-tree.css';

import mainRoutes from 'components/main/main.routes';

angular.module('bonita-doc', ['ui.router', 'services', directives, 'ngSanitize', uiBootstrap, uiTree])

.config(mainRoutes);
