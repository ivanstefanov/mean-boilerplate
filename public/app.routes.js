(function() {
  'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', SetRoutes]);

  function SetRoutes($stateProvider, $urlRouterProvider) {
    //for unmatched routes
    $urlRouterProvider.otherwise('/');

    //Application Routes
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'components/home/home.html'
      })
      .state('vehicle', {
        url: '/vehicle',
        templateUrl: 'components/vehicle/vehicle.html'
      });
  }


}());