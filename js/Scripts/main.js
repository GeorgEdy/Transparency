var app = angular.module("transparencyApp", ['ngRoute', 'chart.js', 'ui.bootstrap', 'ngMaterial']);
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

app.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'><span class='glyphicon glyphicon-remove'></span></div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
    };
});