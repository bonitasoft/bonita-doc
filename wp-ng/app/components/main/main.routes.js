import 'components/main/main.html';
import 'components/main/main.scss';
import mainCtrl from 'components/main/main-controller';

export default /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        views: {
            '@': {
                templateUrl: '/components/main/main.html',
                controller: mainCtrl,
                controllerAs: 'mainCtrl'
            }
        }
    });
}
