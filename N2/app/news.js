app.controller('n2Controller', ['$scope', 'testCache', '$http','$filter', function ($scope, testCache, $http, $filter) {
    var vm = this;
        var cache = testCache.get('test');
       
       loadData = function () {
            var datahold = [];
            var url = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
            $http.get(url)
                .then(function (response) {
                    var rtp = response.data.length;
                    var pm = 0;
                    response.data.forEach(function (obj) {
                         
                        var nurl = "https://hacker-news.firebaseio.com/v0/item/" + obj.toString() + ".json?print=pretty";
                        $http.get(nurl)
                            .then(function (response1) {
                                var feed = { title: response1.data.title, by: response1.data.by, url: response1.data.url, score: response1.data.score };
                                datahold.push(feed);
                                pm++;
                                if (pm === rtp) {
                                    vm.hold = datahold;
                                }
                            });
                    });
                    testCache.put('test', datahold);
                });
        }

        vm.myFilter = function (newVal) {
            var cache = testCache.get('test');
            vm.hold = cache;
            vm.hold = $filter('filter')(vm.hold, newVal);
        };

        vm.clearSearch = function () {
            var cache = testCache.get('test');
            if (cache) {
                vm.hold = cache;
            }
            else {
                loadData();
            }
            vm.searchWord = '';
        };

        //load data first time around
        loadData();
    }

]);