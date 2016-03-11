(function() {
  'use strict';

  angular
    .module('app')
    .controller('VehiclesListCtrl', VehiclesListCtrl);

  VehiclesListCtrl.$inject = ['vehicleService'];

  function VehiclesListCtrl(vehicleService) {
    var vm = this;
    vm.vehicles = [];
    vm.deleteVehicle = deleteVehicle;

    /**
     * Get the vehicles
     */
    function getVehicles() {

      vehicleService.getVehicles()
        .then(function(response) {
            var result = response.data;
            vm.vehicles = result;
          },
          function(response) {
            console.dir(response);
            toastr.error('Error retrieving the vehicles list: ' + response.data);
          });
    }

    function deleteVehicle(vehicleId) {
      console.log(vehicleId);

      BootstrapDialog.show({
        type: 'type-default',
        title: '<strong>Delete Vehicle</strong>',
        message: "Are you sure you want to delete the selected vehicle?",
        buttons: [{
            label: 'Yes',
            action: function(dialogRef) {

              vehicleService.deleteVehicles(vehicleId)
                .then(function(response) {
                    //var result = response.data;
                    getVehicles();
                    toastr.success('The vehicle has been deleted succesfully.');

                  },
                  function(response) {
                    console.dir(response);
                    toastr.error('Error retrieving the vehicles list: ' + response.data);
                  });

                  dialogRef.close();
            }
          },
          {
            label: 'Cancel',
            action: function(dialogRef) {
              dialogRef.close();
            }
          }
        ]
      });
    }


    function init() {
      getVehicles();
    }

    init();

  }

}());