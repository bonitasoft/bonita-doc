import 'jquery';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';

import services from 'services/services';
import directives from 'directives/directives';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import uiBootstrap from 'angular-ui-bootstrap';
import 'font-awesome/scss/font-awesome.scss';

import mainRoutes from 'components/main/main.routes';

angular.module('bonita-doc', ['ui.router', services, directives, 'ngSanitize', uiBootstrap])

.config(mainRoutes)
.config(/*@ngInject*/ $locationProvider => $locationProvider.html5Mode(true).hashPrefix('!'));
