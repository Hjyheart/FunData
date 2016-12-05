/**
 * Created by huang on 16-11-29.
 */

var app = angular.module('myApp');

app.service('listService', function ($http, infoService) {
    this.getList = function(url, pageStart, datasetName) {
        return $http({
            method: "POST",
            url: url,
            params: {
                "username": infoService.getInfo('username'),
                "page": pageStart
            }
        });
    }

});