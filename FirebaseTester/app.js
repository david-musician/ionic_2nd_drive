/* global angular firebase */
angular.module('firebase', ['firebase'])
    .controller("testappController", ['$scope', '$firebaseObject', 'DSWeatherService',
        function ($scope, $firebaseObject, DSWeatherService){
            
            var tac = this;
            
            
            tac.selected_city =
            {
                id: "KAMA",
                lat: 35.2193611,
                lon: -101.7059167,
                temperature: 0
            };
            
            var ref = firebase.database().ref();
            tac.db = $firebaseObject(ref);
            
            tac.getWeather = function (){
                DSWeatherService.getCurrentConditions(tac.selected_city)
                    .then(function(res){
                        console.log(res.data);
                        tac.selected_city.temperature = res.data.currently.temperature;
                        
                        tac.db.latest_temperature = res.data.currently.temperature;
                        tac.db.last_accessed = new Date().getTime();
                        
                        
                        tac.db.$save().then(function(){
                            console.log("SAVED");
                        }).catch(function(error){
                            console.log("PROBLEM: " + error);
                        });
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            };
                
            tac.getWeather();
            
            }])
    
    ///// DARKSKY WEATHER SERVICE FACTORY //////////////////////////////////////////
    .factory('DSWeatherService', ['$sce', '$http', function($sce, $http){
        
        //factory allows us to specify an object to send back
        var dsweatherService = {};
        
        //DarkSky API key
        var key = "6c8b305547beae413df14241f389aea7";
        
        //get current rest conditions
        dsweatherService.getCurrentConditions = function(city){
            
            //for the API
            var url = "https://api.darksky.net/forecast/" +
                      key + "/" + city.lat + "," + city.lon;
                      
            console.log(url);
            
            var trustedurl = $sce.trustAsResourceUrl(url);
            return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});
        
        };
        
        return dsweatherService;
    }]);