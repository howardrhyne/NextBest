app.controller('n2Controller', ['$scope', 'testCache', '$http','$filter', function ($scope, testCache, $http, $filter) {

        var cache = testCache.get('test');
       
        var url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

       //watch for searchWord to filter data
        $scope.$watch('searchWord', function (val) {
            var cache = testCache.get('test');
            $scope.hold = cache;
            $scope.hold = $filter('filter')($scope.hold, val);
        });

       loadData = function () {
            var datahold = [];
            $http.get(url)
                .then(function (response) {
                    $scope.topstories = response.data;
                    response.data.forEach(function (obj) {
                        console.log(obj);
                        var nurl = "https://hacker-news.firebaseio.com/v0/item/" + obj.toString() + ".json?print=pretty";
                        $http.get(nurl)
                            .then(function (response1) {
                                var feed = { title: response1.data.title, by: response1.data.by, url: response1.data.url };
                                datahold.push(feed);
                            });
                    });
                    $scope.hold = datahold;
                    testCache.put('test', datahold);
                });
        }

        $scope.clearSearch = function () {
            var cache = testCache.get('test');
            if (cache) {
                $scope.hold = cache;
            }
            else {
                loadData();
            }
            $scope.searchWord = '';
        };
        //load data first time around
        loadData();
    }

]);