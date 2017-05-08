// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  /* Parent state */
    .state('iscap', {
      url: '/iscap',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    /* Initial login state */
    .state('iscap.login-init', {
      url: '/login-init',
      views: {
        'menuContent': {
          templateUrl: 'templates/login-init.html',
          controller: 'LoginCtrl'
        }
      }
    })
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/iscap/welcome');
})

.controller("testappController", ['$scope', '$firebaseObject', 'DSWeatherService',
  function($scope, $firebaseObject, DSWeatherService) {

    var tac = this;


    tac.selected_city = {
      id: "KAMA",
      lat: 35.2193611,
      lon: -101.7059167,
      weather: {
        temperature: 0,
        pressure: 0
      }
    };

    //enable our ability to contact the database at a certain point
    var ref = firebase.database().ref();
    //obtain the firebase object so that we can sync changes
    tac.db = $firebaseObject(ref);

    tac.getWeather = function() {
      DSWeatherService.getCurrentConditions(tac.selected_city)
        .then(function(res) {
          console.log(res.data);
          tac.selected_city.weather.temperature = res.data.currently.temperature;
          tac.selected_city.weather.pressure = res.data.currently.pressure;

          tac.db.latest_temperature = res.data.currently.temperature;
          tac.db.latest_pressure = res.data.currently.pressure;
          tac.db.last_accessed = new Date().getTime();


          tac.db.$save().then(function() {
            console.log("SAVED");
          }).catch(function(error) {
            console.log("PROBLEM: " + error);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    //and call the method above
    tac.getWeather();

  }
])

///// DARKSKY WEATHER SERVICE FACTORY //////////////////////////////////////////
.factory('DSWeatherService', ['$sce', '$http', function($sce, $http) {

  //factory allows us to specify an object to send back
  var dsweatherService = {};

  //DarkSky API key
  var key = "6c8b305547beae413df14241f389aea7";

  //get current rest conditions
  dsweatherService.getCurrentConditions = function(city) {

    //for the API
    var url = "https://api.darksky.net/forecast/" +
      key + "/" + city.lat + "," + city.lon;

    console.log(url);

    var trustedurl = $sce.trustAsResourceUrl(url);
    return $http.jsonp(trustedurl, {
      jsonpCallbackParam: 'callback'
    });

  };

  return dsweatherService;
}]);