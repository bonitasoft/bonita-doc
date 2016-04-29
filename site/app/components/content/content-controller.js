import angular from 'angular';

export default class ContentController {
  constructor($uiViewScroll, $stateParams, $state, currentVersion) {
    'ngInject';
    this.$uiViewScroll = $uiViewScroll;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.version = currentVersion.name;
  }
  goto($event) {
    if ($event.target.localName.match(/a/)) {
      if ($event.target.hash.match(/^[#]/)) {
        this.$uiViewScroll(angular.element($event.target.hash));
        $event.stopPropagation();
        $event.preventDefault();
        return false;
      }
      console.log($event.target.attributes.href);
      if ($event.target.attributes && $event.target.attributes.href && $event.target.attributes.href.value && $event.target.attributes.href.value.match(/^\//)) {
        this.goToPage($event.target.attributes.href.value.replace(/^\/(.*)\.md$/, '$1'));
      }
    }
  }
  goToPage(page) {
    this.$state.transitionTo(this.$state.current, angular.extend(this.$stateParams, { page: page }), {
      reload: true, inherit: false, notify: true
    });
  }
  getPage() {
    return 'html/' + this.version + '/' + (this.$stateParams.page || 'index') + '.html';
  }
}
