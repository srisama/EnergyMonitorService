var app = angular.module('UserLogin', []);

app.service('UserLoginService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    this.checklogin = function (login) {
        return $http.post(baseUrl + "/ValidateUser", login, { headers: { 'Content-Type': 'application / json / x-www-form-urlencoded,charset=utf-8, text / plain, */*' } });
    }

    //this.getAllRoles = function () {
    //    return $http.get(baseUrl + "/Roles");
    //}
    //this.InsertUser = function (user) {
    //    return $http.post(baseUrl + "/AddUser", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    //}
    //this.getAllUsers = function () {
    //    return $http.get(baseUrl + "/Users");
    //}


});
//http://localhost:56122/EMSLogin
//http://localhost:55654/
//http://localhost:55979/weatherforecast
app.controller('UserLoginController', function UserLoginController($scope, $rootScope, $http, UserLoginService) {

    var websiteurl = "https://localhost:44322/";

    //function for Login
    $scope.Loginbtn = function () {

        var username = $('#username').val();
        var password = $('#password').val();
        var details = { UserName: username, Password: password };
        var promisePost = UserLoginService.checklogin(details);
        promisePost.then(function (status, data) {
            $scope.userdetails = status.data;

            $scope.userdetails1 = status.data.data;
            if ($scope.userdetails == 0) {
                $('#loginfail').removeClass('hide');
            }
            else {
                if ($scope.userdetails1.role_name == 'Admin') {
                    //sessionStorage.removeItem('Admin');
                    sessionStorage.setItem('Admin', '1');

                    //$('#usermanagement').removeClass('hide');
                   
                }
                else {
                    sessionStorage.setItem('Admin', '0');

                    //    $('#usermanagement').addClass('hide');
                }

                window.location.href = websiteurl + "Dashboard";
            }
        }
        );
        /* window.location.href = websiteurl + "Home";*/
    }
    
})