(function() {
  'use strict';

  angular
    .module('jobPortal')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('searchresult', {
        url: '/searchresult',
        templateUrl: 'app/searchresult/searchresult.html',
        controller: 'SearchresultController',
        controllerAs: 'searchresult'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
