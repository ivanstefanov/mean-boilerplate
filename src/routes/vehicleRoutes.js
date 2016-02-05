var vehicleController = require('../controllers/vehicleController');
var util = require('util');

var router = function(express) {
  var vehicleRouter = express.Router({
    mergeParams: true
  });

  vehicleRouter.route('/')
    .get(function(req, res) {
      var vehicles = vehicleController.getVehicles();
      //console.log(vehicles);
      console.log(util.inspect(vehicles));
      //res.send("some text");

      res.json(vehicles);
    })
    .post(function(req, res) {
      vehicleController.createVehicle(req, res);
    });

  return vehicleRouter;
};

module.exports = router;