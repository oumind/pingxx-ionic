(function() {
  'use strict';

  var app = angular.module('pingxx.ionic', ['ionic', 'restangular', 'ngCordova.plugins.pingxx']);

  app.constant('ApiEndpoint', {
    api_url: 'http://YOUR-IP:8010'//TODO YOUR-IP like 192.168.10.10
  });

  app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.config(function(RestangularProvider, ApiEndpoint) {
    RestangularProvider.setBaseUrl(ApiEndpoint.api_url);
  });

  app.controller('MainController', function ($scope, $rootScope, cordovaPingxx, Restangular, $ionicPopup) {
    $scope.amount = 0.1;
    $scope.channel = {name: 'alipay'};


    $scope.pay = function () {
      var data = {
        "channel": $scope.channel.name,
        "amount": $scope.amount*100
      }

      Restangular.all('').customPOST(data, 'pay').then(function(charge) {
        cordovaPingxx.createPayment(charge, 'YOUR-URL-SCHEME');//TODO YOUR-URL-SCHEME is what in this command you hava specified
                                                          // $cordova plugin add ../cordova-plugin-pingxx/ --variable URL_SCHEME=YOUR-URL-SCHEME
      }, function(error) {
        $ionicPopup.alert({
          title: '网络错误',
          template: 'ajax请求失败'
        })
      });
    };

    $rootScope.$on('pingxx:pay-finished', function (event, data) {
      $scope.payResult = {
        "result": data.result,
        "errorCode": data.errorCode,
        "errorMsg": data.errorMsg
      }

      $ionicPopup.alert({
        scope: $scope,
        title: 'pay result',
        templateUrl: 'pay-result-dialog.html'
      })
    });
  });
}());
