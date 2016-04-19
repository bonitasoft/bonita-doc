import _ from 'lodash';

export default class SearchController {
  constructor(searchResults, $stateParams, $state, currentVersion) {
    'ngInject';
    this.pageSize = 10;
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
    });
    this.currentPage = (this.resultStartIndex / this.pageSize) + 1;
  }
  search() {
    this.state.transitionTo(this.state.current, _.extend(this.stateParams, {start: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize}), { reload: this.state.current.name, inherit: false, notify: true });
  }
}
