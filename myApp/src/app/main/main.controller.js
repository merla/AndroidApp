(function() {
  'use strict';

  angular
    .module('jobPortal')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,SearchService,$scope, $http, $window, $state, $document) {
     var vm = this;
     var publicInterface;

    // Fetching dropdown box data from serviceses. 
    vm.statecodes = SearchService.getStateCode();
    vm.jobCategories = SearchService.getJobCategory();
    vm.jobClasstypes = SearchService.getJobClasstype();

    //Google map

    $window.initMap = function() {
        var uluru = {lat: 42.407211, lng: -71.382439};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: uluru
        });
        setMarkers(map);
        }

      //google.maps.event.addDomListener(window, "load", initMap);

var beaches = [
        ['New Bedford city', 41.66149, -70.938196, 9, 'New Bedford'],
        ['Cambridge city', 42.375819, -71.118399, 8, 'Cambridge'],
        ['Springfield city', 42.115498, -72.539525, 7, 'Springfield'],
        ['Worcester city', 42.270543, -71.80794, 6, 'Worcester'],
        ['Brookline', 42.324269, -71.140803, 5,'Brookline'],
        ['Boston city', 42.332221, -71.016432, 4,'Boston'],
        ['Framingham', 42.308536, -71.436754, 3,'Framingham'],
        ['Malden city', 42.430474, -71.057637, 2, 'Malden'],
        ['Waltham city', 42.38892, -71.242325, 1, 'Waltham']
        
      ];


      function setMarkers(map) {
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        var image = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };
        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "holding..."
        });
        for (var i = 0; i < beaches.length; i++) {
          var beach = beaches[i];
          var marker = new google.maps.Marker({
            position: {lat: beach[1], lng: beach[2]},
            map: map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3],
            html: beach[4]
          });

          google.maps.event.addListener(marker, 'click', (function(marker) {
              return function() {
                 $.ajax({
                cache: false,
                data: $.extend({
                publisher: 5396176379454272,
                v: '2',
                format: 'json',
                q: "Information Technology",
                l: this.html,
                radius: 50,
                limit: "",
                sort: "",
                highlight: 1,
                filter: 1,
                userip: '',
                useragent: ''
               }, {
                start: "1",
                end: "10"
               }),
               dataType: 'jsonp',
               type: 'GET',
               url: 'http://api.indeed.com/ads/apisearch'
               })
               .done(function(data) {
                infowindow.close();
                var finalContent = '<div id="content">';
                for (var i = 0; i < data.results.length; i++) {
                finalContent += "<p><a href="+data.results[i].url+" target=\"_blank\" class=\"button js-button\">"+data.results[i].jobtitle+"</a><br>";
                }
                infowindow.setContent(finalContent);
                infowindow.open(map, marker);
               });
              }
            }) (marker));
          
          }
      }
       
    activate();


  // This method will be called on click of any "GO" button in landing page
  // In this method "Indeed" api called to get the search related data.
    function jobClass(state,category,jobType){
      
    SearchService.setState(state);
    SearchService.setCategory(category);
    SearchService.setJobType(jobType);
    $http.jsonp("http://api.indeed.com/ads/apisearch?", {params: {
                    "publisher": 5396176379454272,
                    "v": "2",
                    "format": "json",
                    "callback": "mysuccess",
                    "q": jobType,
                    "l": state,
                    "sort": "",
                    "radius": "",
                    "st": "",
                    "jt": category,
                    "start": "1",
                    "limit": "",
                    "fromage": "",
                    "highlight": "1",
                    "filter": "1",
                    "userip": "1.2.3.4"
                }});
  }

  // Callback method of above called service and response will be stored in service.
  $window.mysuccess = function(response){
    SearchService.setSearchData(response);
    $state.go('searchresult');
  }

    function activate() {
     
    }

     publicInterface = {
        jobClass: jobClass
      };
      angular.extend($scope, publicInterface);
  }
})();
