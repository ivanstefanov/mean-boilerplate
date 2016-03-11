(function() {
	'use strict';

	angular
		.module('app')
		.service('vehicleService', vehicleService);

	vehicleService.$inject = ['$http', 'constants'];

	function vehicleService($http, constants) {

		var serviceResult = {
			getVehicles: getVehicles,
      getVehicle: getVehicle,
			deleteVehicles: deleteVehicles,
      updateVehicle: updateVehicle,
      insertVehicle: insertVehicle
		};

    var vehicleEndpointUrl = constants.REST_SERVER_URL + 'vehicle';

		function getVehicles() {
			return $http({
				method: 'GET',
				url:vehicleEndpointUrl
			});
		}

    function getVehicle(vehicleId) {
			return $http({
				method: 'GET',
				url: vehicleEndpointUrl + '/' + vehicleId
			});
		}


		function deleteVehicles(vehicleId) {
			var body = {
				_id: vehicleId,
			};

			return $http({
				method: 'DELETE',
        headers: {"Content-Type": "application/json;charset=utf-8"},
				url: vehicleEndpointUrl,
				data: body
			});
		}

    function updateVehicle(vehicle){
      return $http({
				method: 'PUT',
        //headers: {"Content-Type": "application/json;charset=utf-8"},
				url: vehicleEndpointUrl,
				data: vehicle
			});
    }

    function insertVehicle(vehicle){
      return $http({
				method: 'POST',
				url: vehicleEndpointUrl,
				data: vehicle
			});
    }

		return serviceResult;
	}

})();