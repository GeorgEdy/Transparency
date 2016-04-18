app.controller("FilterCtrl",function($scope, DataStore){
    $scope.data = [7000, 8500];
    $scope.labels = ['Venituri', 'Cheltuieli'];
    $scope.data = DataStore.getAll;
    console.log($scope.data);
});
