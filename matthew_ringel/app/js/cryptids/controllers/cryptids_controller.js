module.exports = function(app) {
  app.controller('CryptidsController', ['$scope', '$http', 'dummyResource', function($scope, $http, dummyResource) {
    $scope.cryptids = [];
    $scope.defaults = {habitat: 'forest', rabid: false, vegetarian: true, single: true, partner: null};
    $scope.newCryptid = angular.copy($scope.defaults);
    $scope.errors = [];
    $scope.updatedCryptid = null;
    var rabidCheck = function(cryptid) {
      return dummyResource.findRabid(cryptid);
    };

    $scope.rabidView = function(cryptid) {
      $scope.errors.push(rabidCheck(cryptid));
    };

    $scope.getAll = function() {
      $http.get('/api/cryptids')
        .then(function(res) {
          $scope.cryptids = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(cryptid) {
      if (typeof cryptid.hobbies == 'string') {
        cryptid.hobbies = cryptid.hobbies.split(',');
      }

      $http.post('/api/cryptids', cryptid)
      .then(function(res) {
          $scope.cryptids.push(res.data);
          $scope.newCryptid = angular.copy($scope.defaults);
      }, function(err) {
        console.log(err.data);
      });
    };

    $scope.update = function(cryptid, updatedCryptid) {
      cryptid.editing = false;
      updatedCryptid._id = cryptid._id;
      $http.put('/api/cryptids/' + updatedCryptid._id, updatedCryptid)
        .then(function(res) {
          console.log('cryptid updated');
          $scope.getAll();
        }, function(err) {
          $scope.errors.push('could not get cryptid: + cryptid.name');
          console.log(err.data);
        });
    };

    $scope.remove = function(cryptid) {
      $scope.cryptids.splice($scope.cryptids.indexOf(cryptid), 1);
      $http.delete('/api/cryptids/' + cryptid._id)
        .then(function(res) {
            console.log('cryptid removed from database');
        }, function(err) {
          console.log(err.data);
          $scope.getAll();
          $scope.errors.push('could not delete cryptid: ' + cryptid.name);
        });
    };

    $scope.cache = function(cryptid) {
        $scope.updatedCryptid = JSON.parse(JSON.stringify(cryptid));
    };

  }]);
};
