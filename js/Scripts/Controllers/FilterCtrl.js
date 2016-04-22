app.controller("FilterCtrl",function($scope, $timeout, DataStore){
    $scope.data = [];
    /*DataStore.getAll().then(function(items) {
      $scope.data = items;
      console.log("all: ",$scope.data);
  });*/

    $scope.initSetup = function() {
      document.getElementById('datepicker').value = "Jan-2016";
    }

    $timeout($scope.initSetup, 100);

    $scope.search = function() {
      $scope.arie = document.getElementById('arie').value;
      $scope.institutie = document.getElementById('institutie').value;
      $scope.data = document.getElementById('datepicker').value;
      DataStore.getSearch($scope.arie, $scope.institutie).then(function(items){
        $scope.data = items;
    })  
    }
});