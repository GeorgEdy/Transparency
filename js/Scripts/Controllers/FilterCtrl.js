app.controller("FilterCtrl", function ($scope, DataStore) {
    $scope.openModal = function ($event) {
        $scope.modalShown = false;
        $scope.modalShown = !$scope.modalShown;

        var venit;
        var cheltuieli;
        var chartForData = [];

        angular.forEach($scope.data, function (item) {
            var currentRow = $event.target.parentNode;
            var dataId = currentRow.getAttribute('data-id');
            venit = $scope.data[dataId-1].venit;
            cheltuieli = $scope.data[dataId-1].cheltuieli;
        });

        chartForData.push(venit);
        chartForData.push(cheltuieli);
    };



    $scope.data = [];
    DataStore.getAll().then(function (items) {
        $scope.data = items;
    });

    $scope.search = function () {
        $scope.arie = document.getElementById('arie').value;
        $scope.institutie = document.getElementById('institutie').value;
        DataStore.getSearch($scope.arie, $scope.institutie).then(function (items) {
            $scope.data = items;
        })
    };

    $scope.chartData = $scope.openModal().chartForData;
    console.log($scope.chartData);

    $scope.chartLabels = ['Venituri', 'Cheltuieli'];
});