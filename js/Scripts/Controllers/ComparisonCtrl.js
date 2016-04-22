app.controller("ComparisonCtrl",function($scope){
    $scope.labels = ['Venituri', 'Cheltuieli'];
    $scope.chartData = [0, 0];
    $scope.chartSeries = [0, 0];

    angular.forEach($scope.data, function (item) {
        if(item.institutie = '') {};
        venit = $scope.data[dataId-1].venit;
        cheltuieli = $scope.data[dataId-1].cheltuieli;
        $scope.chartData = [];
    });

    $scope.chartData.push(venit);
    $scope.chartData.push(cheltuieli);

    return $scope.chartData;
});
