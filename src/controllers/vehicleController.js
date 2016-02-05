var Vehicle = require('../models/vehicle.js');

var vehicleController = function() {
  var someDymmyData = [
    {
      "_id": "56aa3082ea9525c0555f1972",
      "name": "Herrera",
      "age": 39
  },
    {
      "_id": "56aa30827605923f1ca7c0dc",
      "name": "Josefina",
      "age": 30
  },
    {
      "_id": "56aa3082d66657a79b742a5a",
      "name": "Stephens",
      "age": 23
  },
    {
      "_id": "56aa3082f32511995108e487",
      "name": "Marina",
      "age": 37
  },
    {
      "_id": "56aa3082df8e495182fa4380",
      "name": "Latoya",
      "age": 30
  }
];

  var getVehicles = function() {
    return someDymmyData;
  }

  var createVehicle = function(req, res) {
    var entity = new Vehicle({
      model: req.body.model,
      number: req.body.number,
      engineNumber: req.body.engineNumber,
      year: req.body.year,
      color: req.body.color,
      isActive: req.body.isActive
    });

    entity.save(function(err, entity, numAffected) {
      if (err) {
        //console.error(err)
        res.status(500).send(err);
        console.dir('ERROR saving the vehicle: ' + err);
      }

      console.dir(entity);
      res.status(200).end();
    });


  }

  return {
    getVehicles: getVehicles,
    createVehicle: createVehicle
  }
};


module.exports = vehicleController();