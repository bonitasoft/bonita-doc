import angular from 'angular';

import TocGenerator from './toc.directive';

export default angular.module('com.bonitasoft.documentation.directives', [])
  .directive('tocGenerator', TocGenerator.createInstance)
  .name;
