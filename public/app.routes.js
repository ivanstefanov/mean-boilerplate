(function() {
  'use strict';

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
      })
      .state('vehicle-addedit', {
        url: '/vehicle/add/:vehicleId',
        templateUrl: 'components/vehicle/add/addVehicle.html'
      });
  }

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', SetRoutes]);

}());