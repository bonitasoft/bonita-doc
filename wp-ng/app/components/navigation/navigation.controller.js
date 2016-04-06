import angular from 'angular';

export default class NavigationCtrl {
  constructor(taxonomy, $stateParams, versions, $state) {
    this.taxonomy = taxonomy;
    this.version = $stateParams.version || versions.defaultVersion || '7.3';
    this.$stateParams = $stateParams;
    this.$state = $state;
  }
  goTo(page) {
    this.$state.transitionTo(this.$state.current, angular.extend(this.$stateParams, { page: page.replace(/\.(md|html)$/, '') }), {
      reload: false, inherit: true, notify: false
    });
  }
  expandPathToPage(page) {
    return page;
  }
  isPageCurrentlyDisplayed(page) {
    return page.replace(/\.(md|html)$/, '') === this.$stateParams.page;
  }
}
