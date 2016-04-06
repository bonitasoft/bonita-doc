import angular from 'angular';

export default class HeaderController {
  constructor(versions, $stateParams, $state) {
    this.versionList = versions.list;
    this.selectedVersion = $stateParams.version || versions.defaultVersion;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  selectVersion(version) {
    this.$state.transitionTo(this.$state.current, angular.extend(this.$stateParams, { version: version }), {
      reload: true, inherit: false, notify: true
    });
  }
}
