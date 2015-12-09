'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
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

    }])
    .controller('AppCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        
        $scope.title = "Login";
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
                    $scope.showLoginError = true;
                    $scope.errorMsg = "Login Failed";
                    console.log(errorMsg);
                }
            });
        };

    }])

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

    .controller("TestingCtrl", ['$scope', function($scope){
        $scope.$parent.title = "Testings";
        $scope.img = "img/iconset-addictive-flavour-set/png/screen_aqua_glossy.png";
        $scope.message = "Ello Poppit";
    }]);











