import angular from 'angular';

export default class NavigationCtrl {
  constructor(taxonomy, $stateParams, properties, $state) {
    this.taxonomy = taxonomy;
    this.version = $stateParams.version || properties.defaultVersion || '7.3';
    this.$stateParams = $stateParams;
    this.$state = $state;
    if ($stateParams.page) {
      taxonomy.forEach(taxo => this.expandPathToPage(taxo, $stateParams.page));
    }
  }
  goTo(page) {
    this.$state.transitionTo('main.content', angular.extend(this.$stateParams, { page: page.replace(/\.(md|html)$/, '') }), {
      reload: false, inherit: true, notify: this.$state.current.name !== 'main.content'
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
