var app = angular.module('UserManagement', ['angularUtils.directives.dirPagination']);

app.service('UserManagementService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    this.getAllRoles = function () {
        return $http.get(baseUrl + "/Roles");
    }
    this.InsertUser = function (user) {
        return $http.post(baseUrl + "/AddUser", user, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.getAllUsers = function () {
        return $http.get(baseUrl + "/Users");
    }
    this.GetUserbyuserid = function (user) {
        return $http.post(baseUrl + "/GetUserbyId", user, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.updateUser = function (user) {
        return $http.put(baseUrl + "/UpdateUser", user, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.deleteUser = function (user) {
        return $http.post(baseUrl + "/DeleteUser", user, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
        //    return $http.delete(longurl + deviceid);
    }

});

app.controller('OtherController', function ($rootScope, $scope, $http, UserManagementService) {

});
//http://localhost:56122/EMSLogin
//http://localhost:55654/
//http://localhost:55979/weatherforecast



app.controller('UserManagementController', function UserManagementController($scope, $rootScope, $http, UserManagementService) {

    //$scope.details = { CustomerID: "ProtechTst" };
    loadAllRoles();
    loadAllUsers();
    $scope.currentPage = 1;
    $scope.pageSize = 50;
    $scope.savebtndis = true;
    $scope.updatebtndis = true;

    $rootScope.addControls = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').removeClass('hide');
        $('#username').val('');
        $('#email').val('');
        $('#password').val('');
        $('#ddlrole').val(1);
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    };

    $scope.canceluser = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').addClass('hide');
        $('#username').val('');
        $('#email').val('');
        $('#password').val('');
        $('#ddlrole').val(1);
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    }



    function loadAllRoles() {

        var promise = UserManagementService.getAllRoles();
        promise.then(

            function (response) {
                $scope.roleslist = response.data;
                $scope.allrolesdata = $scope.roleslist.data;
            },
            function (error) {
                $scope.allrolesdata = null;

            }
        );
    }


    function loadAllUsers() {

        var promise = UserManagementService.getAllUsers();
        promise.then(

            function (response) {
                $scope.userslist = response.data;
                $scope.allusersdata = $scope.userslist.data;
            },
            function (error) {
                $scope.allusersdata = null;

            }
        );
    }

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    //Table Page Size Function 
    function MyController($scope) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.users = [];

        var users = $scope.allusersdata;
        for (var i = 1; i <= 100; i++) {
            var user = users[Math.floor(Math.random() * users.length)];
            $scope.devices.push('user ' + i + ': ' + user);
        }

        $scope.pageChangeHandler = function (num) {
            console.log('users page changed to ' + num);
        };
    }
    //Table Pagination Function 
    function OtherController($scope) {
        $scope.pageChangeHandler = function (num) {
            console.log('going to page ' + num);
        };
    }

    //Add New User function
    $scope.insertuser = function () {
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var roleid = $('#ddlrole :selected').val();
        var roleidint = parseInt(roleid);
        var details = { UserName: username, Password: password, Email: email, RoleId: roleidint };
        var promisePost = UserManagementService.InsertUser(details);
        promisePost.then(function (status, data) {
            $('#username').val('');
            $('#email').val('');
            $('#password').val('');
            $('#ddlrole').val(1);
            $scope.savebtndis = true;
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('Inserted Successfully');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllUsers();
        }
        );

    }

    //Edit Existing Device function
    $scope.edituser = function (userid) {
        $scope.userid = userid;
        var details = { UserId: userid };
        var promise = UserManagementService.GetUserbyuserid(details);
        promise.then(

            function (response) {
                $scope.userdata = response.data;
                $scope.singleuser = $scope.userdata.data;
                console.log($scope.singleuser);
                $('#username').val($scope.singleuser.username);
                $('#email').val($scope.singleuser.email);
                $('#password').val($scope.singleuser.password);
                $('#ddlrole').val($scope.singleuser.role_id);
                $('#nspagecontrols').removeClass('hide');
                $('#updatebtn').removeClass('hide');
                $('#cancelbtn').removeClass('hide');
                $('#savebtn').addClass('hide');
                $('.sucessdiv').addClass('hide');
                $('.errordiv').addClass('hide');
                $scope.savebtndis = true;
                $scope.updatebtndis = true;
                //$('#devicename').val('');
                //$('#devicetype').val('');
                //$('#powerconsumption').val('');
            },
            function (error) {
                $('#updatebtn').addClass('hide');
                $('#cancelbtn').addClass('hide');
                $('#savebtn').removeClass('hide');
            }
        );
    }
    /* http://localhost:2005/DeleteDevice/5*/

    //function for update device
    $scope.updateuser = function () {
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var roleid = $('#ddlrole :selected').val();
        var roleidint = parseInt(roleid);
        var details = { UserId: $scope.userid, UserName: username, Password: password, Email: email, RoleId: roleidint };
        var promisePost = UserManagementService.updateUser(details);
        promisePost.then(function (result) {
            $('#username').val('');
            $('#email').val('');
            $('#password').val('');
            $('#ddlrole').val(1);
            $('#updatebtn').addClass('hide');
            $('#cancelbtn').addClass('hide');
            $('#savebtn').removeClass('hide');
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('User is Updated ');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllUsers();
        }
        );

    }


    //Delete Existing Device function
    $scope.deleteuser = function (userid) {
        var details = { UserId: userid };
        var promise = UserManagementService.deleteUser(details);
        promise.then(

            function (response) {
                $('#nspagecontrols').addClass('hide');
                $('#updatebtn').removeClass('hide');
                $('#cancelbtn').removeClass('hide');
                $('#savebtn').addClass('hide');
                $('.sucessdiv').addClass('hide');
                $('.errordiv').addClass('hide');
                $scope.savebtndis = true;
                $scope.updatebtndis = true;
                loadAllUsers();
            },
            function (error) {
                $('#updatebtn').addClass('hide');
                $('#cancelbtn').addClass('hide');
                $('#savebtn').removeClass('hide');
            }
        );

    }


    $rootScope.Downloadexcel = function () {
        $rootScope.allLocationGroupDownloadData = $scope.alllocationgroupdata;
        var fname = 'LocationGroup' + '.xls';
        var tab_text = "<table border='1px'>";
        tab_text += "<tr><th>" + 'Location Group' + "</th><th>" + 'Status' + "</th></tr>";

        $.each($rootScope.allLocationGroupDownloadData, function (i, j) {
            if (j.Status == 1) {
                var updstatus = 'Active';
            }
            else {
                var updstatus = 'InActive';
            }
            tab_text += "<tr><td>" + j.LocationGroup + "</td><td>" + updstatus + "</td></tr>";
        });
        tab_text = tab_text + "</table>";

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            dumiframexls.document.open("txt/html", "replace");
            dumiframexls.document.write(tab_text);
            dumiframexls.document.close();
            dumiframexls.focus();
            sa = dumiframexls.document.execCommand("SaveAs", true, fname);
            console.log(sa);
        }
        else {
            var data_type = 'data:application/vnd.ms-excel';
            var table_div = tab_text;
            var table_html = table_div.replace(/ /g, '%20');

            var link = document.getElementById('dumlnkxls');
            link.download = fname;
            link.href = data_type + ', ' + table_html;
            link.click();
        }
        //$("#meterstable").table2excel({
        //    filename: "Table.xls"
        //});
    }

    $rootScope.DownloadPdf = function () {
        $rootScope.allLocationGroupDownloadData = $scope.alllocationgroupdata;
        var pagetitle = 'LocationGroup';
        $('#' + 'printgrid').find('#pagining').hide();

        $('#' + 'printgrid').find('#dumxls').hide();
        var divToPrint = document.getElementById('printgrid');


        var tab_text = "<table class='table table-sm m-0'>";
        tab_text += "<thead><tr><th>" + 'Location Group' + "</th><th>" + 'Status' + "</th></tr></thead><tbody>";
        $.each($rootScope.allLocationGroupDownloadData, function (i, j) {
            if (j.Status == 1) {
                var updstatus = 'Active';
            }
            else {
                var updstatus = 'InActive';
            }
            tab_text += "<tr><td>" + j.LocationGroup + "</td><td>" + updstatus + "</td></tr>";
        });
        tab_text = tab_text + "</tbody></table>";


        var newWin = window.open('', 'Print-Window');

        newWin.document.open();

        newWin.document.write('<html><head><title>' + pagetitle + '</title><style>.hideexport{display:none !important;}.tblpdf{background-color: #f3f2ee; width: 100%;margin-bottom: 1rem; word-wrap: break-word;box-sizing: border-box;border-collapse: collapse;font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size: 1rem;font-weight: 400;line-height: 1.5;color: #212529;text-align: left;}</style></head><body onload="window.print()">' + tab_text + '</body></html>');

        newWin.document.close();

        setTimeout(function () { newWin.close(); }, 10);

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