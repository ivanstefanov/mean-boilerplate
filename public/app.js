(function() {
  'use strict';

  //MAKE CHANGES TO THESE VARIABLES ACCORDING YOUR SERVER ENVIRONMENT
  var restServerURL = 'http://localhost:3000/';

  angular
    .module('app', [
                 'ui.router',
                  'ngMessages'
                 ])
    .constant('constants', {
      'REST_SERVER_URL': restServerURL
    });
})();