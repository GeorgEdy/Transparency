app.controller("FilterCtrl",function($scope, DataStore){/*
    $scope.data = [7000, 8500];
    $scope.labels = ['Venituri', 'Cheltuieli'];*/
    $scope.data = [];
    DataStore.getAll().then(function(items) {
      $scope.data = items;
      console.log("all: ",$scope.data);
  });

    DataStore.getSearch('educatie', 'gradinita').then(function(items){
        $scope.data = items;
        console.log("area: ",$scope.data);
    })

});
