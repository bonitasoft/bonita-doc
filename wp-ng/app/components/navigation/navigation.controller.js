import angular from 'angular';

export default class NavigationCtrl {
  constructor(taxonomy, $stateParams, versions, $state) {
    this.taxonomy = taxonomy;
    this.version = $stateParams.version || versions.defaultVersion || '7.3';
    this.$stateParams = $stateParams;
    this.$state = $state;
    if ($stateParams.page) {
      taxonomy.forEach(taxo => this.expandPathToPage(taxo, $stateParams.page));
    }
  }
  goTo(page) {
    this.$state.transitionTo(this.$state.current, angular.extend(this.$stateParams, { page: page.replace(/\.(md|html)$/, '') }), {
      reload: false, inherit: true, notify: false
    });
  }
  expandPathToPage(node, page) {
    const name = node.href && node.href.replace(/\.(md|html)$/, '');
    if (name && name === page) {
      node.isExpanded = true;
    } else if (node.children) {
      node.isExpanded = node.children.reduce((acc, curr) => {
        return acc || this.expandPathToPage(curr, page);
      }, false);
    }
    return node.isExpanded;
  }
  isPageCurrentlyDisplayed(page) {
    return page.replace(/\.(md|html)$/, '') === this.$stateParams.page;
  }
}
