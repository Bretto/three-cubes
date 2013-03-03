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


var productsPromise = function ($q, $route, $http, $log, $stateParams, $timeout) {

    function makeObj(i){
        return {title:'Product: ' + i}
    }

    var deferred = $q.defer();
    var promiseData = [];

    for (var i = 0; i < 10; i++) {
        promiseData.push(makeObj(i));
    }

    $timeout(function(){deferred.resolve(promiseData); },0);

    return deferred.promise;
}

var productPromise = function ($q, $route, $http, $log, $stateParams, $timeout) {

    var deferred = $q.defer();
    var promiseData = {title:$stateParams.id};

    $timeout(function(){deferred.resolve(promiseData); },0);

    return deferred.promise;
}