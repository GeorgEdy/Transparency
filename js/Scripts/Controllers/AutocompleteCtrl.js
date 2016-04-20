app.controller('AutocompleteCtrl', AutocompleteCtrl);

function AutocompleteCtrl ($timeout, $q, $log) {
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
        }  