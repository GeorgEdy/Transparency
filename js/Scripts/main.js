var app = angular.module("transparencyApp", ['ngRoute']);

var pages = [
    {name: 'Home', url: ''},
    {name: 'Filter', url: 'filter'},
    {name: 'Comparison', url: 'comparison'}
];

app.config(function($routeProvider, $locationProvider){

    $locationProvider.html5Mode({
        enable:true,
        requireBase:false
    });
    angular.forEach(pages, function (page) {
        $routeProvider.when('/' + page.url, {
            templateUrl: 'pages/' + (!page.url ? 'home' : page.url) + '.html'
        })
    });
    $routeProvider.otherwise({
        templateUrl: 'pages/home.html',
        controller: "HomeCtrl"
    });

});
app.controller("HomeCtrl",function($scope){

});
app.controller("FilterCtrl",function($scope){

});
app.controller("ComparisonCtrl",function($scope){

});