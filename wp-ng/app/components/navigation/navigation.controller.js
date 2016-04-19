import _ from 'lodash';

export default class NavigationCtrl {
  constructor(taxonomy, $stateParams, properties, $state, currentVersion) {
    'ngInject';
    this.taxonomy = taxonomy;
    this.version = currentVersion.name;
    this.$stateParams = $stateParams;
    this.$state = $state;
    if ($stateParams.page) {
      taxonomy.forEach(taxo => this.expandPathToPage(taxo, $stateParams.page));
    }
  }
  goTo(page) {
    this.$state.transitionTo('main.content', _.extend(this.$stateParams, { page: page.replace(/\.(md|html)$/, '') }), {
      reload: 'main.content', inherit: false, notify: this.$state.current.name !== 'main.content'
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
