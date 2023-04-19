var app = angular.module('EnergyUsagebyDeviceModule', ['angularUtils.directives.dirPagination']);

app.service('EnergyUsagebyDeviceService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    var longurl = 'http://localhost:2000/api/Devices/DeleteDevice/';

    //this.getAllDevices = function (device) {
    //    return $http.post(baseUrl + "/LocationGroups", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    //}
    this.GetAllDevices = function () {
        return $http.get(baseUrl + "/Devices");
    }

    this.GetAllEnergyUsageByDevice = function () {
        return $http.get(baseUrl + "/EnergyUsageByDevice");
    }

    this.GetEnergyUsageByDevicebyid = function (data) {
        return $http.post(baseUrl + "/GetEnergyUsageByDevicebyId", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.insertEnergyUsageByDevice = function (data) {
        return $http.post(baseUrl + "/AddEnergyUsageByDevice", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.updateEnergyUsageByDevice = function (data) {
        return $http.put(baseUrl + "/UpdateEnergyUsageByDevice", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.deleteEnergyUsageByDevice = function (data) {
        return $http.post(baseUrl + "/DeleteEnergyUsageByDevice", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
        //    return $http.delete(longurl + deviceid);
    }
});
app.controller('OtherController', function ($rootScope, $scope, $http, EnergyUsagebyDeviceService) {

});

app.controller('EnergyUsagebyDeviceController', function EnergyUsagebyDeviceController($scope, $rootScope, $http, EnergyUsagebyDeviceService) {

    getDevicesdropdown();
    //getDevicesdropdown_ddl();
    //var details = { device_id: 1 };
    loadAllEnergyUsageByDevice();
    $scope.currentPage = 1;
    $scope.pageSize = 50;
    $scope.savebtndis = true;
    $scope.updatebtndis = true;
    $scope.device_id = "0";
    $scope.filterdevice = 0;

    $rootScope.addControls = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').removeClass('hide');
        $('#usagedata').val('');
        $('#totalenergyusage').val('');
      
        $scope.device_id = "0";
        $scope.filterdevice = 0;
        $scope.srchDevice = '';
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    };

    $scope.cancelenergyusagebydevice = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').addClass('hide');
        $('#usagedata').val('');
        $('#totalenergyusage').val('');
        $scope.device_id = "0";
        $scope.filterdevice = 0;
        $scope.srchDevice = '';
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    }

    function loadAllEnergyUsageByDevice(user) {

        var promise = UserPreferenceService.GetAllUserPreferencebyUserId(user);
        promise.then(

            function (response) {
                $scope.userpreferencelist = response.data;
                $scope.alluserpreferencedata = $scope.userpreferencelist.data;
            },
            function (error) {
                $scope.alluserpreferencedata = null;

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
        $scope.userpreferences = [];

        var userpreferences = $scope.alluserpreferencedata;
        for (var i = 1; i <= 100; i++) {
            var userpreference = userpreferences[Math.floor(Math.random() * userpreferences.length)];
            $scope.userpreferences.push('userpreference ' + i + ': ' + userpreference);
        }

        $scope.pageChangeHandler = function (num) {
            console.log('userpreferences page changed to ' + num);
        };
    }
    //Table Pagination Function 
    function OtherController($scope) {
        $scope.pageChangeHandler = function (num) {
            console.log('going to page ' + num);
        };
    }

    function setdatetime2(datetime) {
        var storedatetime = datetime;
        var date = new Date();

        var array = storedatetime.split('/');
        var day = array[0];
        var month = array[1];
        var year = array[2];
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        var date11 = date.toISOString();
        alert(date11);
        return date11;
    }


    //Add New Deviceusage function
    $scope.insertenergyusagebydevice = function () {
        var deviceid = $scope.device_id;
        //var devicetype = $scope.devicetype;
        var usagedata = $('#usagedata').val();
        var totalenergyusage = $('#totalenergyusage').val();
        //var energyusagegoalint = parseInt(energyusagegoal);
        //var energyalertthresholdint = parseInt(energyalertthreshold);

        var details = { User_Id: userid, Energy_Usage_Goal: energyusagegoalint, Energy_Alert_Threshold: energyalertthresholdint, Report_Frequency: reportfrequency, Device_Id: deviceid };
        var promisePost = UserPreferenceService.insertUserPreference(details);
        promisePost.then(function (status, data) {
            $('#usagedata').val('');
            $('#totalenergyusage').val('');
            $scope.device_id = "0";
            $scope.filterdevice = 0;
            $scope.srchDevice = '';
            $scope.savebtndis = true;
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('Inserted Successfully');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllUserPreferences(details);
        }
        );
    }

    //Edit Existing UserPreference function
    $scope.editenergyusagebydevice = function (preferenceid) {
        $scope.preferenceid = preferenceid;
        var details = { Preference_Id: preferenceid };
        var promise = UserPreferenceService.GetUserPreferenceebyPreferenceid(details);
        promise.then(

            function (response) {
                $scope.userpreferencedata = response.data;
                $scope.singleuserpreference = $scope.userpreferencedata.data;
                console.log($scope.singleuserpreference);
                $scope.getselecteddevice($scope.singleuserpreference.device_id, $scope.singleuserpreference.device_name);
                $('#usagedata').val($scope.singleuserpreference.energy_usage_goal);
                $('#totalenergyusage').val($scope.singleuserpreference.energy_alert_threshold);

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
    $scope.updateenergyusagebydevice = function () {
        var preferenceid = $scope.preferenceid;
        var energyusagegoal = $('#energyusagegoal').val();
        var energyalertthreshold = $('#energyalertthreshold').val();
        var reportfrequency = $('#reportfrequency').val();
        var userid = $scope.staticuserid;
        var deviceid = $scope.device_id;

        var energyusagegoalint = parseInt(energyusagegoal);
        var energyalertthresholdint = parseInt(energyalertthreshold);

        var details = { Preference_Id: preferenceid, User_Id: userid, Energy_Usage_Goal: energyusagegoalint, Energy_Alert_Threshold: energyalertthresholdint, Report_Frequency: reportfrequency, Device_Id: deviceid };

        var promisePost = UserPreferenceService.updateUserPreference(details);
        promisePost.then(function (result) {
            $('#usagedata').val('');
            $('#totalenergyusage').val('');
            $scope.device_id = "0";
            $scope.filterdevice = 0;
            $scope.srchDevice = '';
            $('#updatebtn').addClass('hide');
            $('#cancelbtn').addClass('hide');
            $('#savebtn').removeClass('hide');
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('UserPreference is Updated ');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllUserPreferences(details);
        }
        );

    }


    //Delete Existing Device function
    $scope.deleteenergyusagebydevice = function (preferenceid) {
        var id = preferenceid;
        var details = { Preference_Id: id };
        var promise = UserPreferenceService.deleteUserPreference(details);
        promise.then(

            function (response) {
                $('#nspagecontrols').removeClass('hide');
                $('#updatebtn').removeClass('hide');
                $('#cancelbtn').removeClass('hide');
                $('#savebtn').addClass('hide');
                $('.sucessdiv').addClass('hide');
                $('.errordiv').addClass('hide');
                $scope.savebtndis = true;
                $scope.updatebtndis = true;
                loadAllUserPreferences(details);
            },
            function (error) {
                $('#updatebtn').addClass('hide');
                $('#cancelbtn').addClass('hide');
                $('#savebtn').removeClass('hide');
            }
        );

    }




    //function to call countryid and country for dropdown
    function getDevicesdropdown() {

        var promise = UserPreferenceService.GetAllDevices();
        promise.then(

            function (response) {
                $scope.dropdownDevicesData = response.data;
                $scope.allDevicesdropdownData = $scope.dropdownDevicesData.data;
                console.log($scope.allDevicesdropdownData);
            },
            function (error) {
                $scope.dropdownDevicesData = null;

            }
        );
    }


    //provincediv Function is using to Select value to Dropdown Function 
    $scope.devicediv = function () {
        $('#devicediv').removeClass('hide');
        $scope.device_id = 0;
        $scope.device_name = '';
        $scope.srchDevice = '';
        $scope.filterdevice = 1;
        //    $scope.finalvalidation();
    }

    //For Search Dropdown items from list
    $scope.getfilterdevices = function () {
        $('#devicediv').removeClass('hide');
        $scope.filterdevice = 1;
        $scope.device_id = 0;
        //    $scope.finalvalidation();
    }

    //Getting ProvinceId and ProvinceName to Dropdown Function
    $scope.getselecteddevice = function (id, name) {
        $scope.device_id = id;
        $scope.device_name = name;
        $scope.srchDevice = name;
        $scope.filterdevice = 0;
        $scope.details = { Device_Id: $scope.device_id };

        //loadAllEnergyConsumption($scope.details);
        //    $scope.finalvalidation();
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