app.controller("FilterCtrl",function($scope, DataStore){/*
    $scope.data = [7000, 8500];
    $scope.labels = ['Venituri', 'Cheltuieli'];*/
    $scope.data = [];
    DataStore.getAll().then(function(items) {
      $scope.data = items;
      console.log("all: ",$scope.data);
  });

    $scope.search = function() {
      $scope.arie = document.getElementById('arie').value;
      $scope.institutie = document.getElementById('institutie').value;
      DataStore.getSearch($scope.arie, $scope.institutie).then(function(items){
        $scope.data = items;
        console.log("data ",$scope.data);
    })  
    }
});