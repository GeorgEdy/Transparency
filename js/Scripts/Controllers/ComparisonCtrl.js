app.controller("ComparisonCtrl", function ($scope, DataStore) {

    $scope.chartSeries = ['Venituri', 'Cheltuieli'];
    $scope.chartData = [];
    $scope.chartVenit = [];
    $scope.chartCheltuieli = [];
    $scope.labels = [];
    $scope.institutie1 = document.getElementById("byinstitutie");
    $scope.institutie2 = document.getElementById("byinstitutie2");

    $scope.search = function () {
        DataStore.getAll().then(function (items) {
            $scope.data = items;

            angular.forEach($scope.data, function (item) {
                if (item.institutie.toLowerCase() === $scope.institutie1.value.toLowerCase()) {
                    var dataId = item.id;
                    $scope.chartVenit.push($scope.data[dataId - 1].venit);
                    $scope.chartCheltuieli.push($scope.data[dataId - 1].cheltuieli);
                    $scope.labels.push(item.institutie);
                };
                if (item.institutie.toLowerCase() === $scope.institutie2.value.toLowerCase()) {
                    var dataId = item.id;
                    $scope.chartVenit.push($scope.data[dataId - 1].venit);
                    $scope.chartCheltuieli.push($scope.data[dataId - 1].cheltuieli);
                    $scope.labels.push(item.institutie);
                };
            });

            $scope.chartData.push($scope.chartVenit);
            $scope.chartData.push($scope.chartCheltuieli);
        });
        $scope.chartData = [];
        $scope.labels = [];
    };

    Chart.defaults.global.colours = ['#ffff00','#000'];
});
