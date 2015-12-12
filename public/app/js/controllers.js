'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('AppCtrl', ['$scope', '$location', '$http', 'allSearchResults', function ($scope, $location, $http, allSearchResults) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        
        $scope.title = "Volunteer App";
        // $scope.subNav1 = 0;
        $scope.login_success=false;
        $scope.user = {};
        
        $scope.LoginUser = function(){
            var model = {
                username: $scope.user.username,
                password: $scope.user.password
            };
            
            $http.post("/login", model).success(function(response){
                if(response.success == true){
                    $scope.login_success = true;
                    console.log($scope.login_success);
                    $scope.login_message = "Howdy " + model.username + "!";
                } else {
                    $scope.show_error_msg = true;
                    $scope.errorMsg = "Hmm...";
                    console.log(errorMsg);
                }
            });
        };

        $scope.query = allSearchResults.query;
        $scope.$watch('query', function(){
            allSearchResults.query = $scope.query;
        });

        $scope.ShowSearchResults = function(){
        $http.post("/searchresults", model).success(function(response){
                if(response.success == true){
                    $scope.login_message = "Howdy " + model;
                } else {
                    console.log(errorMsg);
                }
            });

    }

    }])



    .service('allSearchResults',function(){
        this.query = "";
    })

    .controller('RegistrationCtrl', ['$scope', '$http', function($scope, $http){
        $scope.user = {};
        $scope.register_success = false;
        $scope.RegisterUser = function(){

            var registerModel = {
            name: $scope.user.username ,
            email: $scope.user.email,
            password: $scope.user.password,
        };

            $http.post("/register", registerModel).success(function(response){

                if(response.success == true){
                $scope.register_success = true;
                $scope.register_message = "Welcome " + registerModel.name + "!";
            } else {
                $scope.register_error =  "Registration Failed";
            }

            });
        };
    }])
  .directive('searchResults',function(){
    return {
        restrict: 'AE',
        template: '<div class="col-sm-4"><div class="thumbnail"><img src="..." alt="..."><h3>{{ query }}Thumbnail label</h3><p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p></div></div>'
        };
    })

  



  //Other Controllers
  .controller('ChartCtrl', ['$scope', function ($scope) {
        $scope.$parent.title = "Charts";
        $scope.$parent.img = "img/iconset-addictive-flavour-set/png/chart.png";
        $scope.$parent.showTopToggle = false;
    }])
    .controller('IconsCtrl', ['$scope', function ($scope) {
        $scope.$parent.title = "Icons";
        $scope.$parent.img = "img/iconset-addictive-flavour-set/png/box_address.png";
        $scope.$parent.showTopToggle = false;
    }])
    .controller('ModalsCtrl', ['$scope', function ($scope) {
        $scope.$parent.title = "Modals";
        $scope.$parent.img = "img/iconset-addictive-flavour-set/png/fullscreen.png";
        $scope.$parent.showTopToggle = false;
    }])
    .controller('FormsCtrl', ['$scope', function ($scope) {
        $scope.$parent.title = "Forms";
        $scope.$parent.img = "img/iconset-addictive-flavour-set/png/tablet.png";
        $scope.$parent.showTopToggle = false;

    }]);











