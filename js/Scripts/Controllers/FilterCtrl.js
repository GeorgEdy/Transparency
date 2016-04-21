app.controller("FilterCtrl", function ($scope, DataStore) {
    $scope.openModal = function ($event) {
        $scope.modalShown = false;
        $scope.modalShown = !$scope.modalShown;

        var venit = 0;
        var cheltuieli = 0;
        var chartData = [venit, cheltuieli];

        angular.forEach($scope.data, function (item) {
            venit = item.venit;
            cheltuieli = item.cheltuieli;
            /*var tr = document.getElementsByTagName('tr');*/
            var currentRow = $event.target;
            var dataId = currentRow.getAttribute('data-id');
            console.log(dataId);
        });

        return chartData;
    };

    $scope.data = [];
    DataStore.getAll().then(function (items) {
        $scope.data = items;
        console.log("all: ", $scope.data);
    });

    $scope.search = function () {
        $scope.arie = document.getElementById('arie').value;
        $scope.institutie = document.getElementById('institutie').value;
        DataStore.getSearch($scope.arie, $scope.institutie).then(function (items) {
            $scope.data = items;
            console.log("data ", $scope.data);
        })
    };

    $scope.chartData = $scope.openModal;
    /*function(){
     /!*var venit = 0;
     var cheltuieli = 0;
     var chartData = [venit,cheltuieli];

     angular.forEach($scope.data, function(item){
     console.log(item);
     venit = item.venit;
     cheltuieli = item.cheltuieli;
     console.log(venit);
     console.log(cheltuieli);
     });

     return chartData;*!/
     };*/

    $scope.chartLabels = ['Venituri', 'Cheltuieli'];
});