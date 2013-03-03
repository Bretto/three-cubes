'use strict';
/* App Controllers */

var controllers = angular.module('App.controllers', []);

controllers.controller('MainCtrl', function ($scope, $rootScope, $timeout, $log, Scene3DApi, MainModel){
    $log.info('MainCtrl');

    $scope.$on('$stateChangeSuccess', function(e, to, from){
        $log.info('$stateChangeSuccess', 'PRODUCT');

        if(to.url === '/products'){
            MainModel.activeView = 'PRODUCTS';
        }else if(to.url === '/:id'){
            MainModel.activeView = 'PRODUCT';
        }
    });
});

controllers.controller('MainNavCtrl', function ($scope, $timeout, MainModel, $routeParams, $log){
    $log.info('MainNavCtrl');

});

controllers.controller('MainContentCtrl', function ($scope, $rootScope, $timeout, $compile, $log, MainModel){
    $log.info('MainContentCtrl');

});

controllers.controller('ProductsCtrl', function ($scope, MainModel, $log, $http, $routeParams, $timeout, Scene3DApi, OBJ3D, promiseData){
    $log.info('ProductsCtrl');

    $scope.MainModel = MainModel;
    MainModel.root = 'welcome';

    $scope.data = promiseData;

    MainModel.breadcrumbs(MainModel.root);

    $scope.isOut = function(){
        return (MainModel.activeView === 'PRODUCTS')? false:true;
    }

    $scope.$on('$stateChangeSuccess', function(e, to, from){
        $log.info('$stateChangeSuccess', 'PRODUCTS');
        if(MainModel.activeView === 'PRODUCTS'){
            $scope.transform(Scene3DApi.getProductsLayoutIn(OBJ3D.PRODUCTS,0), 1500);
        }
    });


    $scope.$on('addObj3D', function(e,obj3D){
        //$log.info('addObj3D', 'HOME')
        e.stopPropagation();
        OBJ3D.PRODUCTS.push(obj3D);
    });

    $scope.$on('render3dComplete', function(e,obj3D){
        //$log.info('render3dComplete', 'HOME');
        e.stopPropagation();
        $scope.setInitPosition(Scene3DApi.getFlyOutLayout(OBJ3D.PRODUCTS,$scope.getCamera()));

        if(MainModel.activeView === "PRODUCT"){
            $scope.transform(Scene3DApi.getProductsLayoutOut(OBJ3D.PRODUCTS,0), 1500);
        }else{
            $scope.transform(Scene3DApi.getProductsLayoutIn(OBJ3D.PRODUCTS,0), 1500);
        }


    })


});

controllers.controller('ProductCtrl', function ($scope, MainModel, $log, $http, $routeParams, $timeout, Scene3DApi, OBJ3D, promiseData){
    $log.info('ProductCtrl');

    $scope.MainModel = MainModel;
    MainModel.root = 'welcome';

    $scope.data = promiseData;

    MainModel.breadcrumbs(MainModel.root);

    $scope.isIn = function(){
        return (MainModel.activeView === 'PRODUCT')? false:true;
    }

    $scope.$on('$stateChangeSuccess', function(e, to, from){
        $log.info('$stateChangeSuccess', 'PRODUCT');
        if(MainModel.activeView === 'PRODUCT'){

            $scope.transform(Scene3DApi.getProductsLayoutOut(OBJ3D.PRODUCTS, 0), 1500);
        }
    });


    $scope.$on('addObj3D', function(e,obj3D){
        //$log.info('addObj3D', 'HOME')
        e.stopPropagation();
        OBJ3D.PRODUCT.push(obj3D);
    });

    $scope.$on('render3dComplete', function(e,obj3D){
        //$log.info('render3dComplete', 'HOME');
        e.stopPropagation();
        $scope.setInitPosition(Scene3DApi.getFlyOutLayout(OBJ3D.PRODUCT,$scope.getCamera()));
        $scope.transform(Scene3DApi.getProductsLayoutIn(OBJ3D.PRODUCT,0), 1500);
    })


});

















