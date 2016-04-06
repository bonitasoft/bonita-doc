export default class NavigationCtrl {
  constructor(taxonomy, $stateParams) {
    this.taxonomy = taxonomy;
    this.version = $stateParams.version;
  }
}
