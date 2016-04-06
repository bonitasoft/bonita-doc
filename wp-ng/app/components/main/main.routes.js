import 'components/header/header.html';
import HeaderController from 'components/header/header.controller';
import 'components/header/header.scss';
import 'components/navigation/navigation.html';
import NavigationController from 'components/navigation/navigation.controller';
import 'components/navigation/navigation.scss';
import 'components/main/main.html';
import 'components/main/main.scss';
import mainCtrl from 'components/main/main-controller';
import 'components/content/content.html';
import 'components/content/content.scss';
import ContentCtrl from 'components/content/content-controller';

export default /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/?version&page',
    abstract: true,
    views: {
      '@': {
        templateUrl: '/components/main/main.html',
        controller: mainCtrl,
        controllerAs: 'mainCtrl'
      },
    },
    resolve: {
      versions: /*@ngInject*/ $http => $http.get('/versions.json').then(response => response.data)
    }
  }).state('main.content', {
    url: '',
    views: {
      'header': {
        templateUrl: '/components/header/header.html',
        controller: HeaderController,
        controllerAs: 'headerCtrl',
      },
      'navigation': {
        templateUrl: '/components/navigation/navigation.html',
        controller: NavigationController,
        controllerAs: 'navCtrl'
      },
      'content': {
        templateUrl: '/components/content/content.html',
        controller: ContentCtrl,
        controllerAs: 'contentCtrl'
      }
    },
    resolve: {
      taxonomy: /*@ngInject*/ $http => $http.get('/taxonomy.json').then(response => response.data)
    }
  });
}
