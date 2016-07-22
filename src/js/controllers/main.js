(function() {
  'use strict'

  function MainCtrl(appConfig) {
    var ctrl = this;
    ctrl.title = appConfig.title;
  }
  angular.module('web').controller('MainCtrl', MainCtrl);
})();
