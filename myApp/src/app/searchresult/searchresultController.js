(function() {
  'use strict';

  angular
    .module('jobPortal')
    .controller('SearchresultController', SearchresultController);

 

  /** @ngInject */
  function SearchresultController($scope,SearchService,$http,$rootScope,$window) {
  
  var vm = this;
  var publicInterface;

  //Pagination variables for initial table.
  vm.currentPage = 1;
  vm.pageSize = 10;

  activate();

    //On each pagination click, this method will be called to fetch related data.
    // Indeed rest service is called to fetch data.
   function pageChangeHandler(pageNumber){
        
        $http.jsonp("http://api.indeed.com/ads/apisearch?", {params: {
                    "publisher": 5396176379454272,
                    "v": "2",
                    "format": "json",
                    "callback": "mysuccess",
                    "q": SearchService.getJobType(),
                    "l": SearchService.getState(),
                    "sort": "",
                    "radius": "",
                    "st": "",
                    "jt": SearchService.getCategory(),
                    "start": pageNumber,
                    "limit": "",
                    "fromage": "",
                    "highlight": "1",
                    "filter": "1",
                    "userip": "1.2.3.4"
                }});
    }

    // Service call callback method to store response in scope.
    $window.mysuccess = function(response){
     $rootScope.$broadcast('refreshData', response);
    }

     $scope.$on('refreshData', function(event, data){
        vm.searchData = data;
      });

  function activate() {
     vm.searchData = SearchService.getSearchData();
     }

     publicInterface = {
        pageChangeHandler: pageChangeHandler
      };
      angular.extend($scope, publicInterface);
  }
})();
