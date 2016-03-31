var app = angular.module("transparencyApp", ['ngRoute', 'chart.js']);

app.config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: 'Views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .when('/comparison', {
            templateUrl: 'Views/comparison.html',
            controller: 'ComparisonCtrl',
            controllerAs: 'comparison'
        })
        .when('/filter', {
            templateUrl: 'Views/filter.html',
            controller: 'FilterCtrl',
            controllerAs: 'filter'
        })
        .otherwise({
            redirectTo: '/'
        });
});
;app.controller("ComparisonCtrl",function($scope){

});
;app.controller("FilterCtrl",function($scope){
    console.log($scope);
    $scope.data = [7000, 8500];
    $scope.labels = ['Venituri', 'Cheltuieli'];/*
    var pie = document.getElementById('pie').getContext('2d');*/
});
;app.controller("HomeCtrl",function($scope){

});;