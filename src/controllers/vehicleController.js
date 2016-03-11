'use strict';

var Vehicle = require('../models/vehicle.js');
var _ = require('lodash');

var vehicleController = function(redisClient, logger) {

  require('../helpers/db-helper.js')(redisClient);

  /**
   * Get list with all vehicles
   * @param  object req The Express HTTP request object
   * @param  object res Express HTTP response object
   */
  var getVehicles = function(req, res) {
    var promise = Vehicle.find();

    promise.then(function(results) {
      logger.debug('returning all vehicles :' + results.length);
      res.json(results);
    });

  };

  /**
   * Get a vehicle by its id number
   * @param  {object} req The Express HTTP request object
   * @param  {object} res Express HTTP response object
   */
  var getVehicle = function(req, res) {
    var vehicleId = req.params.id;

    var promise = Vehicle.findOne({
      _id: vehicleId
    });

    promise.then(
      function(vehicle) {

        if (!vehicle) {
          res.status(404).json({
            info: 'Vehicle not found',
            vehicleId: vehicleId
          });
        }

        res.json(vehicle);
      },
      function(err) {
        res.status(500).json({
          info: 'Error retrieving the vehicle',
          error: err
        });
      });
  };

  /**
   * Create a vehicle
   * @param  {object} req The Express HTTP request object.
   * The provided vehicle must follow this structure:
   * {
   * model: String,
   * number: String,
   * engineNumber: String,
   * year: Number,
   * color: String,
   * isActive: Boolean
   * }
   * @param  {object} res Express HTTP response object
   */
  var createVehicle = function(req, res) {

    var entity = new Vehicle({
      model: req.body.model,
      number: req.body.number,
      engineNumber: req.body.engineNumber,
      year: req.body.year,
      color: req.body.color,
      isActive: req.body.isActive
    });

    var promise = entity.save();

    promise.then(
      function(entity) {
        res.status(200).json({
          info: 'Vehicle has been saved successfully!',
          vehicleId: entity.id
        }).end();
      },
      function(err) {
        res.status(500).json({
          info: "Error saving vehicle",
          error: err
        });
      }
    );
  };

  /**
   * Updates a vehicle
   * @param  object req The Express HTTP request object
   * The provided vehicle must follow this structure:
   * {
   * _id: guid,
   * model: String,
   * number: String,
   * engineNumber: String,
   * year: Number,
   * color: String,
   * isActive: Boolean
   * }
   * @param  object res Express HTTP response object
   */
  var updateVehicle = function(req, res) {
    var vehicleId = req.body._id;
    var promise = Vehicle.findById(vehicleId);

    promise.then(
      function(vehicle) {

        if (!vehicle) {
          res.status(404).json({
            info: 'vehicle not found!',
            vehicleId: vehicleId
          });
        }

        _.merge(vehicle, req.body);

        vehicle.save().then(
          function(entity) {
            res.status(200).json({
              info: 'Vehicle has been updated successfully!',
              vehicleId: entity.id
            }).end();
          },
          function(err) {
            res.status(500).json({
              info: "Error updating vehicle",
              error: err
            });
          });
      },
      function(err) {
        res.status(500).json({
          info: 'error during updating the vehicle ',
          error: err
        });
      });
  };

  /**
   * Deletes a vehicle
   * @param  {object} req The Express HTTP request object.
   * The provided vehicle info must follow this structure:
   * {
   * _id: guid,
   * }
   * @param  {object} res Express HTTP response object
   */
  var deleteVehicle = function(req, res) {
    console.log("calling deleteVehicle");
    var vehicleId = req.body._id;
    var promise = Vehicle.findByIdAndRemove(vehicleId);

    promise.then(
      function(result) {
        if (!result) {
          res.status(200).json({
            info: 'mongodb does not return operation result. probably vehicle with this id does not exists.',
            vehicleId: vehicleId
          });
        }

        res.status(200).json({
          info: 'vehicle has been deleted successfully',
          result: result
        });
      },
      function(err) {
        res.status(500).json({
          info: 'error deleting vehicle ',
          error: err
        });
      });
  };

  return {
    getVehicles: getVehicles,
    getVehicle: getVehicle,
    createVehicle: createVehicle,
    updateVehicle: updateVehicle,
    deleteVehicle: deleteVehicle
  };
};

module.exports = vehicleController;