(function() {
  'use strict';

  angular
    .module('jobPortal')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
