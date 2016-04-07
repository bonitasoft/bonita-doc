export default class SearchController {
  constructor(searchResults, $stateParams) {
    this.searchRequest = $stateParams.searchRequest;
    console.log(searchResults);
    this.results = searchResults.response.docs;
    this.results.forEach(doc => {
      doc.summary = searchResults.highlighting[doc.name].content.join(' ... ');
      doc.page = doc.name.replace(/\.html$/g, '');
    });
  }
}
