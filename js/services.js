'use strict';


var services = angular.module('App.services', []);



services.constant('OBJ3D', {
    PRODUCTS:[],
    PRODUCT:[]
});

services.factory('MainModel', function ($http, $log, $rootScope, $routeParams, $location) {

    function capitaliseFirstLetter(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var mainModel = {
         root: ''
        ,productURI: ''
        ,productID: ''
        ,rootCrumb: ''
        ,productCrumb: ''
        ,itemCrumb: ''
        ,activeView:''
    };

    mainModel.breadcrumbs = function (rootCrumb, productCrumb,itemCrumb ){
        mainModel.rootCrumb = capitaliseFirstLetter(rootCrumb) + ' /';
        mainModel.productCrumb = (productCrumb)?  productCrumb + ' /' : '';
        mainModel.itemCrumb = itemCrumb;
    }

    mainModel.isNavActive = function (value){
        return (value === mainModel.root)? 'nav-active' : '';
    }

    return mainModel;
});


services.factory('Scene3DApi', function ($http, $log, $rootScope, $routeParams, $location) {




    function getProductsLayoutIn(showObjects, z){

        var layout = [];

        for (var i = 0; i < showObjects.length; i++) {

            var object = showObjects[ i ];

            var objId = 'comp'+i;
            var obj = showObjects[i];
            var objTarget = new THREE.Object3D();

            objTarget.position.x = 0;
            objTarget.position.y = 0;
            objTarget.position.z = 0;

            layout[objId] = {obj:obj, objTarget:objTarget};

        }



        return layout;
    }

    function getProductsLayoutOut(showObjects, z){

        var layout = [];

        for (var i = 0; i < showObjects.length; i++) {

            var object = showObjects[ i ];

            var objId = 'comp'+i;
            var obj = showObjects[i];
            var objTarget = new THREE.Object3D();

            objTarget.position.x = 0;
            objTarget.position.y = 1200;
            objTarget.position.z = -1500;


            layout[objId] = {obj:obj, objTarget:objTarget};

        }



        return layout;
    }

    function getProductLayout(showObjects, z){

        var layout = [];
        var col = 0, row = 0;

        for (var i = 0; i < showObjects.length; i++) {

            var object = showObjects[ i ];

            var objId = 'comp'+i;
            var obj = showObjects[i];
            var objTarget = new THREE.Object3D();

            objTarget.position.x = 0;
            objTarget.position.y = 0;
            objTarget.position.z = z;

            layout[objId] = {obj:obj, objTarget:objTarget};

        }

        return layout;
    }

    function getFlyOutLayout(showObjects, camera){

        var layout = [];
        var col = 0, row = 0;

        for (var i = 0; i < showObjects.length; i++) {

            var object = showObjects[ i ];

            var objId = 'comp'+i;
            var obj = showObjects[i];
            var objTarget = new THREE.Object3D();

            objTarget.position.x = 0;
            objTarget.position.y = 0;
            objTarget.position.z = -5000;
            objTarget.rotation.x = (Math.random()*360 + 180) * (Math.PI/180);
            objTarget.rotation.y = (Math.random()*360 + 180) * (Math.PI/180);
            objTarget.rotation.z = (Math.random()*360 + 180) * (Math.PI/180);

            layout[objId] = {obj:obj, objTarget:objTarget};
        }
        return layout;
    }

    var Scene3DApi = {
        getProductsLayoutIn:getProductsLayoutIn,
        getProductsLayoutOut:getProductsLayoutOut,
        getProductLayout:getProductLayout,
        getFlyOutLayout:getFlyOutLayout
    };

    return Scene3DApi;
});
