app.controller("HomeCtrl",function($scope){
    $scope.openModal = function () {
        $scope.modalShown = false;
        $scope.modalShown = !$scope.modalShown;
    };
});