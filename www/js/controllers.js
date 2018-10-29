angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $ionicPopup) {

    $scope.showAlert = function (text) {
      var alertPopup = $ionicPopup.alert({
        title: 'Alert',
        template: text
      });
    };

    $scope.addOrUpdate = function () {
      if (window.geofence) {
        var geofenceData = [{
          id: "1",
          latitude: 51.5066815,
          longitude: -0.090208,
          radius: 300,
          transitionType: TransitionType.ENTER,
          notification: {
            title: "Welcome to Minerva House",
            text: "You just arrived to Minerva House.",
            openAppOnClick: true
          }
        }, {
          id: "2",
          latitude: 51.584413,
          longitude: -0.264401,
          radius: 300,
          transitionType: TransitionType.ENTER,
          notification: {
            title: "Welcome to Kingsbury",
            text: "You just arrived to Kingsbury, Uphill Drive.",
            openAppOnClick: true
          }
        }, {
          id: "3",
          latitude: 51.523291,
          longitude: -0.156906,
          radius: 300,
          transitionType: TransitionType.ENTER,
          notification: {
            title: "Welcome to Baker Street",
            text: "You just arrived to Baker street tube station.",
            openAppOnClick: true
          }
        }];
        window.geofence.addOrUpdate(geofenceData).then(function () {
          $scope.showAlert('Geofence successfully added');
        }, function (reason) {
          $scope.showAlert('Adding geofence failed' + JSON.stringify(reason));
        });
      }
    };
    $scope.addOrUpdate();

    $scope.deleteAll = function () {
      if (window.geofence) {
        window.geofence.removeAll()
          .then(function () {
            $scope.showAlert('All geofences successfully removed.');
          }, function (error) {
            $scope.showAlert('Removing geofences failed' + JSON.stringify(error));
          });
      }
    };

    $scope.getAllWatched = function () {
      if (window.geofence)
        window.geofence.getWatched().then(function (geofencesJson) {
          $scope.geofences = JSON.parse(geofencesJson);
          $scope.$apply();
        });
    };
    $scope.getAllWatched();

    $scope.listenWatch = function () {
      if (window.geofence)
        window.geofence.onTransitionReceived = function (geofences) {
          geofences.forEach(function (geo) {
            $scope.showAlert('Geofence transition detected' + JSON.stringify(geo));
          });
        };
    };

    $scope.getCurrentLocation = function () {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
          $scope.showAlert('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
        });
    };

  })

  .controller('ChatsCtrl', function ($scope) {
    $scope.mapCreated = function (map) {
      $scope.map = map;
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
