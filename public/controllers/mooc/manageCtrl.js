/**
 * Created by hongjiayong on 2016/12/8.
 */
app.controller('manageCtrl', ['$scope', '$http', 'constService', 'divideService', 'authService', 'uploadService',
    function ($scope, $http, constService, divideService, authService, uploadService) {
    $scope.username = null;
    $scope.steps = [];
    $scope.mooc_id = $('#mooc-id').text();

    this.$onInit = function () {

    // init user
    if (authService.getUser() !== null && authService.getUser() !== 'null'){
        $scope.username = authService.getUser();
    }

    $http({
        method: 'POST',
        url: constService.urls().getDetailInit,
        params: {
            id: $scope.mooc_id,
            username: authService.getUser()
        }

    }).then( res => {
        console.log(res);
        $scope.overview = res.data.course_overview;
        $scope.steps = res.data.course_steps.course_steps;
        $('#overview-content').replaceWith(divideService.getHtml($scope.overview));

    }).catch(err => {
        console.log(err);
    });
};

    $scope.showStep = function (step, index) {
        $('#' + index).replaceWith(divideService.getHtml(step.step_content));
        $('#overview-btn').removeClass('active');
        $('.ui.attached.tab.active').removeClass('active');
        $('#' + index + "-step").addClass('active');
    };

    $scope.stepEditDeal = function (step, index) {
        $('#' + index + '-edit-form').transition('vertical flip');
        $('#' + index + '-edit-content').text($('#' + index + '-content').text());
        $('#' + index + '-edit-btn').transition('fly left');
    };

    $scope.stepSubmit = function (step, index) {
        $('#' + index + '-edit-form').transition('vertical flip');
        $('#' + index + '-edit-btn').transition('fly left');

        $http({
            method: 'POST',
            url: constService.urls().editStepContent,
            params:{
                'id': step.id,
                'content': $('#' + index + '-edit-content').val()
            }
        }).then( res=>{
            console.log(res.data);
            $('.ui.text.container p').replaceWith(divideService.getHtml($('#' + index + '-edit-content').val()));
        }).catch( err=>{
            console.log(err);
        })

    };

    $scope.submitNewStep = function(name, content){
        $http({
            method: 'POST',
            url: constService.urls().addStep,
            params: {
                content: content,
                id: $scope.mooc_id,
                name: name
            }
        }).then( res=>{
            $scope.steps = $scope.steps.concat(res.data);
            console.log(res);

        }).catch(err =>{
            console.log(err);
        });
    };

    $scope.overEditDeal = function () {
        $('#over-edit-form').transition('vertical flip');
        $('#over-edit-content').text($('#over-container').text());
        $('#over-edit-btn').transition('fly left');
    };

    $scope.overSubmit = function (overview) {
        $('#over-edit-form').transition('vertical flip');
        $('#over-edit-btn').transition('fly left');
        $http({
            method: 'POST',
            url: constService.urls().submitOverview,
            params: {
                content: overview,
                id: $scope.mooc_id
            }
        }).then( res=>{
            console.log(res);
            $('.ui.text.main.container p').replaceWith(divideService.getHtml(overview));

        }).catch(err =>{
            console.log(err);
        });
    };

    $scope.changeGuide = function (step, index) {
        uploader = uploadService.upload(3,
            {
                stepId: step.id,
                courseId: $scope.mooc_id,
                index: index

            });
        $('#new-guide').modal('show');

    };

    $scope.guideChanged = function () {
        $('#new-guide').modal('hide');
    }
    $scope.addNewStep = function () {
        $('#add-step').modal('show');
    };

}]);