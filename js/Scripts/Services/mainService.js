app.factory('DataStore', function ($http, $q) {
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

        return {
            getAll: getAll
        };
    })();
});