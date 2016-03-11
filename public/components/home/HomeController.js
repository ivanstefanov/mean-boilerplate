(function() {
  'use strict';

  function HomeCtrl() {
    var vm = this;

    vm.message = "Hello from angular controller";
  }

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);
  //HomeCtrl.$inject = []
}());