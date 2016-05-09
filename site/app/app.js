import './app.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';


import 'jquery';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';

import services from 'services/services';
import directives from 'directives/directives';

import uiBootstrap from 'angular-ui-bootstrap';

import mainRoutes from 'components/main/main.routes';

angular.module('bonita-doc', ['ui.router', services, directives, 'ngSanitize', uiBootstrap])

.config(mainRoutes)
//.config(/*@ngInject*/ $compileProvider => $compileProvider.debugInfoEnabled(false))
.config(/*@ngInject*/ $locationProvider => $locationProvider.html5Mode(true).hashPrefix('!'));
