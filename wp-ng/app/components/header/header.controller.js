import angular from 'angular';

export default class HeaderController {
  constructor(properties, $stateParams, $state, $http) {
    'ngInject';
    this.supportedVersionList = properties.supportedVersionList.filter((item, index) => index < 5);
    this.unsupportedVersionList = properties.supportedVersionList.filter((item, index) => index >= 5);
    this.selectedVersion = $stateParams.version || properties.defaultVersion;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$http = $http;
  }
  selectVersion(version) {
    this.$state.transitionTo('main.content', angular.extend(this.$stateParams, { version: version }), {
      reload: false, inherit: false, notify: true
    });
  }
  search(searchRequest) {
    this.$state.go('main.content.search', {searchRequest: searchRequest, page: null});
  }
}
