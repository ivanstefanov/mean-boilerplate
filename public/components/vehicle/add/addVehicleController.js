$('#saveVehicle').addClass('disabled');
(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddVehicleCtrl', AddVehicleCtrl);

  AddVehicleCtrl.$inject = ['$http', 'vehicleService', '$stateParams'];

  function AddVehicleCtrl($http, vehicleService, $stateParams) {
    var vm = this;

    vm.model = '';
    vm.number = '';
    vm.engineNumber = '';
    vm.year = '';
    vm.color = '';
    vm.isActive = '';
    vm.saveVehicle = saveVehicle;

    var vehicleId;

    var SAVE_BUTTON_LABEL = "Save";
    var SAVING_BUTTON_LABEL = "Saving...";
    var UPDATE_BUTTON_LABEL = "Update";
    var UPDATING_BUTTON_LABEL = "Updating...";
    var ADD_PAGE_TITLE = 'Add Vehicle';
    var UPDATE_PAGE_TITLE = 'Edit Vehicle';

    function saveVehicle() {
      if (vehicleId.length > 0) {
        _updateVehicle(vehicleId);
      } else {
        _insertVehicle();
      }
    }

    function _init() {
      var pageTitle = ADD_PAGE_TITLE;
      var submitButtonTitle = SAVE_BUTTON_LABEL;
      vehicleId = $stateParams.vehicleId;
      //edit mode
      if (vehicleId.length > 0) {
        _bindVehicleData(vehicleId);
        pageTitle = UPDATE_PAGE_TITLE;
        submitButtonTitle = UPDATE_BUTTON_LABEL;
      }

      $('#title').html(pageTitle);
      $('#saveVehicle').html(submitButtonTitle);
    }

    function _bindVehicleData(vehicleId) {
      vehicleService.getVehicle(vehicleId)
        .then(function(response) {

            var currentVehicle = response.data;

            vm.model = currentVehicle.model;
            vm.number = currentVehicle.number;
            vm.engineNumber = currentVehicle.engineNumber;
            vm.year = currentVehicle.year;
            vm.color = currentVehicle.color;
            vm.isActive = currentVehicle.isActive;
            //console.dir(currentVehicle);
          },
          function(response) {
            var errorMessage = response.data.info;
            toastr.error('Error retrieving the vehicle: ' + errorMessage);
          });
    }

    function _updateVehicle(vehicleId) {

      var formData = {
        _id: vehicleId,
        model: vm.model,
        number: vm.number,
        engineNumber: vm.engineNumber,
        year: vm.year,
        color: vm.color,
        isActive: vm.isActive
      };

      $('#saveVehicle').html(UPDATING_BUTTON_LABEL);
      $('#saveVehicle').addClass('disabled');

      vehicleService.updateVehicle(formData)
        .then(
          function(successResponse) {
            toastr.success(successResponse.data.info);
          },
          function(errorResponse) {
            toastr.error(errorResponse.data.info + ': ' + errorResponse.data.error.message);
          })
        .finally(
          function() {
            $('#saveVehicle').html(UPDATE_BUTTON_LABEL);
            $('#saveVehicle').removeClass('disabled');
          });
    }

    function _insertVehicle() {

      var formData = {
        model: vm.model,
        number: vm.number,
        engineNumber: vm.engineNumber,
        year: vm.year,
        color: vm.color,
        isActive: vm.isActive
      };

      $('#saveVehicle').html(SAVING_BUTTON_LABEL);
      $('#saveVehicle').addClass('disabled');

      vehicleService.insertVehicle(formData)
        .then(
          function(successResponse) {
            toastr.success(successResponse.data.info);
          },
          function(errorResponse) {
            toastr.error(errorResponse.data.info + ': ' + errorResponse.data.error.message);
          })
        .finally(
          function() {
            $('#saveVehicle').html(SAVE_BUTTON_LABEL);
            $('#saveVehicle').removeClass('disabled');
          });
    }

    _init();

  }
}());