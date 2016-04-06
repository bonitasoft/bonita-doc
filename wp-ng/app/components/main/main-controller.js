import angular from 'angular';

export default /*@ngInject*/ function($uiViewScroll) {
  this.applicationName = 'bonita-doc';
  this.goto = $event => {
    if ($event.target.localName.match(/a/) && $event.target.hash.match(/^[#]/)) {
      $uiViewScroll(angular.element($event.target.hash));
      return false;
    }
  };
}
