import angular from 'angular';
import SearchService from './search.service';

export default angular
  .module('com.bonitasoft.documentation.services', [])
  .service('searchService', SearchService)
  .name;
