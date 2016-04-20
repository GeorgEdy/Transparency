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
;app.controller("ComparisonCtrl",function($scope){

});
;app.controller("FilterCtrl",function($scope, DataStore){/*
    $scope.data = [7000, 8500];
    $scope.labels = ['Venituri', 'Cheltuieli'];*/
    $scope.data = [];
    DataStore.getAll().then(function(items) {
      $scope.data = items;
      console.log("all: ",$scope.data);
  });

    DataStore.getSearch('educatie', 'gradinita').then(function(items){
        $scope.data = items;
        console.log("area: ",$scope.data);
    })

});
;app.controller("HomeCtrl",function($scope){
    $scope.openModal = function () {
        $scope.modalShown = false;
        $scope.modalShown = !$scope.modalShown;
    };

});;app.factory('DataStore', function ($http, $q) {
    return (function () {
        var URL = 'https://intense-sierra-23176.herokuapp.com/search';

        var getAll = function () {
            return $q(function (resolve, reject) {
                $http({url: URL}).then(function (xhr) {
                        if (xhr.status == 200) {
                            resolve(xhr.data);
                        } else {
                            reject();
                        }
                    },
                    reject
                );
            })
        };
        var getSearch = function (area, inst) {
            return $q(function (resolve, reject) {
                var url = URL;
                var params = '';
                if (area !== '') {
                    params = '?area=' + area;
                }
                if (inst !== '') {
                    if (params !== '') {
                        params += '&inst=' + inst;
                    } else {
                        params = '?inst=' + inst
                    }
                }
                url += params;
                $http({url: url}).then(function (xhr) {
                        if (xhr.status == 200) {
                            resolve(xhr.data);
                        } else {
                            reject();
                        }
                    },
                    reject
                );
            })
        };

        return {
            getAll: getAll,
            getSearch: getSearch
        };
    })();
});