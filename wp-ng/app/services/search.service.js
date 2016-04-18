import _ from 'lodash';
import qs from 'qs';

export default class SearchService {
  constructor($http) {
    'ngInject';
    this.http = $http;
  }
  search(solrCore, properties = {}, query = '', start = 0, pageSize = 10) {
    const search = {
      q: query,
      start: start,
      rows: pageSize
    };
    return this.http.get(properties.search.url + solrCore + '/select?' + qs.stringify(_.extend(properties.search.defaultParams, search))).then(response => response.data).catch(response => response);
  }
}
