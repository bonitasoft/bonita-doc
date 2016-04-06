import angular from 'angular';

export default class ContentController {
  constructor($uiViewScroll, $stateParams, $state) {
    'ngInject';
    this.$uiViewScroll = $uiViewScroll;
    this.$stateParams = $stateParams;
    this.$state = $state;
  }
  goto($event) {
    if ($event.target.localName.match(/a/)) {
      if ($event.target.hash.match(/^[#]/)) {
        this.$uiViewScroll(angular.element($event.target.hash));
        $event.stopPropagation();
        $event.preventDefault();
        return false;
      }
      console.log($event.target);
      if ($event.target.hash.match(/^[#]/)) {
        this.$state.transitionTo(this.$state.current, angular.extend(this.$stateParams, { page: '' }), {
          reload: true, inherit: false, notify: true
        });
      }
    }
  }
  getPage() {
    return 'html/' + (this.$stateParams.page || 'index') + '.html';
  }
}
