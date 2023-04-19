var app = angular.module('DashboardModule', ['angularUtils.directives.dirPagination']);

app.service('DashboardService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352

    //this.getAllLocationGroups = function (locationgroup) {
    //    return $http.post(baseUrl + "/LocationGroups", locationgroup, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    //}

   
});
app.controller('OtherController', function ($rootScope, $scope, $http, DashboardService) {

});

app.controller('DashboardController', function DashboardController($scope, $rootScope, $http, DashboardService) {


    //loadAllLocationGroup();


    function loadAllLocationGroup() {

        var promise = LocationGroupService.getAllLocationGroups($scope.details);
        promise.then(

            function (response) {
                $scope.locationgrouplist = response.data;
                $scope.alllocationgroupdata = $scope.locationgrouplist.data;
            },
            function (error) {
                $scope.alllocationgroupdata = null;

            }
        );
    }


    //function to check special characters/RegExp return true if have regexp
    function checkspclcharacters(data) {
        var regex = new RegExp("^[a-zA-Z0-9 ]+$");
        if (!regex.test(data)) {
            return true;
        } else {
            return false;

        }
    }

    


});