(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl)

  //HomeCtrl.$inject = []

  function HomeCtrl() {
    var vm = this;

    vm.message = "Hello from angular controller";
  }
}());