'use strict';

var router = function(express, redisClient, logger) {
  var vehicleController = require('../controllers/vehicleController.js')(redisClient, logger);
  var vehicleRouter = express.Router();

  vehicleRouter.route('/')
    .get(function(req, res) {
      vehicleController.getVehicles(req, res);
    })
    .post(function(req, res) {
      vehicleController.createVehicle(req, res);
    })
    .put(function(req, res) {
      vehicleController.updateVehicle(req, res);
    })
    .delete(function(req, res) {
      vehicleController.deleteVehicle(req, res);
    });

  vehicleRouter.route('/:id')
    .get(function(req, res) {
      vehicleController.getVehicle(req, res);
    });

  return vehicleRouter;
};

module.exports = router;