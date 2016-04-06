import 'components/header/header.html';
import 'components/header/header.scss';
import 'components/navigation/navigation.html';
import NavigationController from 'components/navigation/navigation.controller.js';
import 'components/navigation/navigation.scss';
import 'components/main/main.html';
import 'components/main/main.scss';
import mainCtrl from 'components/main/main-controller';

export default /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    views: {
      'header': {
        templateUrl: '/components/header/header.html'
      },
      'navigation': {
        templateUrl: '/components/navigation/navigation.html',
        controller: NavigationController,
        controllerAs: 'navCtrl',
        resolve: {
          taxonomy: /*@ngInject*/ $http => $http.get('/taxonomy.json').then(response => response.data)
        }
      },
      'content': {
        templateUrl: '/components/main/main.html',
        controller: mainCtrl,
        controllerAs: 'mainCtrl'
      }
    }
  });
}
