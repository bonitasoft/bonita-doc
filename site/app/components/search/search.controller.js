import _ from 'lodash';

export default class SearchController {
  constructor(searchResults, $stateParams, $state, currentVersion, taxonomy) {
    'ngInject';
    this.pageSize = 10;
    this.taxonomy = taxonomy;
    this.searchRequest = $stateParams.searchRequest;
    this.updateSearchParams(searchResults);
    this.state = $state;
    this.stateParams = $stateParams;
    this.currentVersion = currentVersion;
  }
  updateSearchParams(searchResults) {
    this.results = searchResults.response.docs;
    this.totalResults = searchResults.response.numFound;
    this.resultStartIndex = searchResults.response.start;
    this.results.forEach(doc => {
      doc.summary = searchResults.highlighting[doc.name].content.join(' ... ');
      doc.page = doc.name.replace(/\.html$/g, '');
      doc.title = this.findNameInTaxonomy(this.taxonomy, doc.name) || doc.page;
    });
    this.currentPage = (this.resultStartIndex / this.pageSize) + 1;
  }
  search() {
    this.state.transitionTo(this.state.current, _.extend(this.stateParams, {start: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize}), { reload: this.state.current.name, inherit: false, notify: true });
  }
  findNameInTaxonomy(taxonomy, href) {
    if (href && href === taxonomy.href) {
      return taxonomy.name;
    } else if (taxonomy.children) {
      taxonomy.children.reduce((acc, curr) => {
        return acc || this.findNameInTaxonomy(curr, href);
      }, false);
    }
  }
}
