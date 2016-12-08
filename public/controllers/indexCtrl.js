/**
 * Created by huang on 16-11-28.
 */
var app = angular.module('myApp');
app.controller('indexCtrl', function ($scope, $http,
                                        infoService) {
    $scope.isLogin = false;
    this.$onInit = function () {
        return infoService.getInfo('username')
                .then( res => {
                    $scope.isLogin = !(res.data === undefined) ;
                });

    }
});
