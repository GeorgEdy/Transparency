app.controller("HomeCtrl",function($scope){
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    $scope.openModal = function () {
        $scope.modalShown = false;
        $scope.modalShown = !$scope.modalShown;
    };
});