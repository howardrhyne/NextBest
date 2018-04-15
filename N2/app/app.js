var app = angular.module('n2App', []);

app.factory('testCache', function ($cacheFactory) {

    return $cacheFactory('testCache');

});