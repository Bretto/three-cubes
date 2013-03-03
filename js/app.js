'use strict';

angular.module('App', ['App.filters', 'App.services', 'App.directives', 'App.controllers', 'ui.compat']).
    config(function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider) {

        $stateProvider
            .state('products', {
                url:'/products',
                views:{
                    'products':{
                        templateUrl:'partial/products.html',
                        controller:'ProductsCtrl'
                    }
                },
                resolve:{
                    promiseData:productsPromise
                },
                onEnter:function ($rootScope, $state, $log) {
                    $rootScope.$broadcast('PRODUCTS:onEnter');
                },
                onExit:function ($rootScope, $state) {
                    $rootScope.$broadcast('PRODUCTS:onExit');
                }
            })
            .state('products.product', {
                url:'/:id',
                views:{
                    'product':{
                        templateUrl:'partial/product.html',
                        controller:'ProductCtrl'
                    }
                },
                resolve:{
                    promiseData:productPromise
                },
                onEnter:function ($rootScope, $state, $log) {
                    $rootScope.$broadcast('PRODUCT:onEnter');
                },
                onExit:function ($rootScope, $state) {
                    $rootScope.$broadcast('PRODUCT:onExit');
                }
            })

        //$urlRouterProvider.otherwise('/');

    })
    .run(
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });


//var productsPromise = function ($q, $route, $http, $log, $stateParams, $timeout) {
//
//    function makeObj(i){
//        return {title:'Product: ' + i}
//    }
//
//    var deferred = $q.defer();
//    var promiseData = [];
//
//    for (var i = 0; i < 10; i++) {
//        promiseData.push(makeObj(i));
//    }
//
//    $timeout(function(){deferred.resolve(promiseData); },0);
//
//    return deferred.promise;
//}


var productsPromise = function ($q, $route, $http, $log, $stateParams, $timeout) {

    var api_key, deferred, params, url;
    deferred = $q.defer();
    api_key = '2bb0b524a3e3cbb9ceaea74b30dabf93';
    url = 'http://api.flickr.com/services/rest/';
    params = {
        method: 'flickr.photos.search',
        api_key: api_key,
        text: 'cameleon',
        per_page: 22,
        format: 'json',
        page: 1,
        jsoncallback: 'JSON_CALLBACK'
    };
    $http.jsonp(url, {
        params: params
    }).success(function(data, status, headers, config) {
            var page_info, photos;
            page_info = {};
            page_info.page = data.photos.page;
            page_info.pages = data.photos.pages;

            photos = $.map(data.photos.photo, function(photo) {
                return {
                    title: photo.title,
                    thumb_src: "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg",
                    src: "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"
                };
            });
            return deferred.resolve(photos);
        });
    return deferred.promise;
}






var productPromise = function ($q, $route, $http, $log, $stateParams, $timeout) {

    var deferred = $q.defer();
    var promiseData = {title:$stateParams.id};

    $timeout(function(){deferred.resolve(promiseData); },0);

    return deferred.promise;
}