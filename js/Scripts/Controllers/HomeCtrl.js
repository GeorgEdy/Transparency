app.controller("HomeCtrl", function($scope, DataStore){
    $scope.openModal = function () {
        $scope.modalShown = false;
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.date =[];
    $scope.showData = function () {
        var incomeSum = 0;
        var outcomeSum = 0;
        DataStore.getAll().then(function (items) {
            $scope.date = items;

            items.forEach(function (index) {
                if( index.judet ==='Bucuresti') {
                    incomeSum += Math.round(index.venit);
                    outcomeSum += Math.round(index.cheltuieli);
                }
            });
            document.getElementById('income-hover').innerHTML = 'Total venituri: '  + incomeSum +'.000 lei';
            document.getElementById('outcome-hover').innerHTML = 'Total cheltuieli: ' + outcomeSum +'.000 lei';
            return [incomeSum, outcomeSum];
        });
        document.getElementById('income-outcome').classList.add('data-container');
    };
    $scope.hideData = function () {
        document.getElementById('income-hover').innerHTML = '';
        document.getElementById('outcome-hover').innerHTML = '';
        document.getElementById('income-outcome').classList.remove('data-container');
    }
});