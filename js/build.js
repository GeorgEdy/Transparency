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
});;app.controller('AutocompleteCtrl', function($timeout, $q, $log){
  var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.jud        = loadJud();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
   
    function querySearch (query) {
      var results = query ? self.jud.filter( createFilterFor(query) ) : self.jud, deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { 
          deferred.resolve( results ); 
        }, 
        Math.random() * 1000, false);
          return deferred.promise;
      } else {
          return results;
      }
   }
   function searchTextChange(text) {
      $log.info('Text changed to ' + text);
   }
   function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
   }
   //build list of states as map of key-value pairs
   function loadJud() {
      var allJud = 'Alba, Arad, Arges, Bacau, Bihor, Bistrita Nasaud, Botosani,\
        Braila, Brasov, Bucuresti, Buzau, Calarasi, Caras Severin, Cluj,\
        Constanta, Covasna, Dambovita, Dolj, Galati, Giurgiu, Gorj,\
        Harghita, Hunedoara, Ialomita, Iasi, Ilfov, Maramures,\
        Mehedinti, Mures, Neamt, Olt, Prahova, Salaj, Satu Mare,\
        Sibiu, Suceava, Teleorman, Timis, Tulcea, Valcea, Vaslui, Vrancea' ;
      return allJud.split(/, +/g).map( function (state) {
         return {
            value: state.toLowerCase(),
            display: state
         };
      });
   }
   //filter function for search query
   function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
         return (state.value.indexOf(lowercaseQuery) === 0);
      };
   }
 });;app.controller("ComparisonCtrl",function($scope){

});
;app.controller('DatePickerCtrl', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    maxDate: new Date(2016, 1, 1),
    showWeeks: false
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1,
    'datepicker-mode':"'month'",
    'min-mode':"month",
    maxDate: new Date(2016, 1, 1),
    minDate: new Date(2016, 1, 1)
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };
  
  $scope.popup1 = {
    opened: false
  };

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});;app.controller("FilterCtrl",function($scope, $timeout, DataStore){
    $scope.data = [];
    /*DataStore.getAll().then(function(items) {
      $scope.data = items;
      console.log("all: ",$scope.data);
  });*/

    $scope.initSetup = function() {
      document.getElementById('datepicker').value = "Jan-2016";
    }

    $timeout($scope.initSetup, 100);

    $scope.search = function() {
      $scope.arie = document.getElementById('arie').value;
      $scope.institutie = document.getElementById('institutie').value;
      $scope.data = document.getElementById('datepicker').value;
      DataStore.getSearch($scope.arie, $scope.institutie).then(function(items){
        $scope.data = items;
    })  
    }
});;app.controller("HomeCtrl", function($scope, DataStore){
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
                    params = '?area=' + encodeURIComponent(area);
                }
                if (inst !== '') {
                    if (params !== '') {
                        params += '&inst=' + encodeURIComponent(inst);
                    } else {
                        params = '?inst=' + encodeURIComponent(inst);
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