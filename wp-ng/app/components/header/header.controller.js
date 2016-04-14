import _ from 'lodash';

export default class HeaderController {
  constructor(properties, $stateParams, $state, $http, $window, $uibModal) {
    'ngInject';
    this.supportedVersionList = properties.supportedVersionList.filter((item, index) => index < 4);
    this.unsupportedVersionList = properties.supportedVersionList.filter((item, index) => index >= 4);
    this.selectedVersion = $stateParams.version || properties.defaultVersion;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.modal = $uibModal;
    this.window = $window;
  }
  selectVersion(version) {
    this.$state.transitionTo('main.content', _.extend(this.$stateParams, { version: version }), {
      reload: false, inherit: false, notify: true
    });
  }
  search(searchRequest) {
    this.$state.go('main.content.search', {searchRequest: searchRequest, page: null});
  }
  goToFormerDocumentationSite(versionFragment) {
    this.modal.open({
      template:
      `<div class="modal-body">
        You will be redirected to the former documentation site
       </div>
       <div class="modal-footer ng-scope">
            <button class="btn btn-primary" type="button" ng-click="$close()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="$dismiss()">Cancel</button>
        </div> `,
      size: 'sm'
    }).result.then(() => this.window.location = 'http://documentation.bonitasoft.com/version/' + versionFragment);
  }
}
