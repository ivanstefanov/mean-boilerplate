(function() {
  'use strict';

  angular
    .module('app')
    .controller('VehicleCtrl', VehicleCtrl)

  VehicleCtrl.$inject = ['$http']

  function VehicleCtrl($http) {
    var vm = this;

    vm.model;
    vm.number;
    vm.engineNumber;
    vm.year;
    vm.color;
    vm.isActive;

    vm.saveVehicle = function() {

      var formData = {
        model: vm.model,
        number: vm.number,
        engineNumber: vm.engineNumber,
        year: vm.year,
        color: vm.color,
        isActive: vm.isActive
      };

      $http({
        method: 'POST',
        url: '/vehicle',
        data: $.param(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function successCallback(response) {
        console.dir(response);
        toastr.info('The vehicle info has been saved: ' + response.statusText);
      }, function errorCallback(response) {
        console.dir(response);
        toastr.error('The vehicle was unable to be saved: ' + response.data.message);
      });
    }
  }
}());