var app = angular.module('DevicesModule', ['angularUtils.directives.dirPagination']);

app.service('DeviceService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    var longurl = 'http://localhost:2000/api/Devices/DeleteDevice/';

    //this.getAllDevices = function (device) {
    //    return $http.post(baseUrl + "/LocationGroups", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    //}
    this.getAllDevices = function () {
        return $http.get(baseUrl + "/Devices");
    }
    this.getDevicebyId = function (device) {
        return $http.post(baseUrl + "/GetDevicebyId", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.insertDevice = function (device) {
        return $http.post(baseUrl + "/AddDevice", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.updateDevice = function (device) {
        var devicedata = device;
        return $http.put(baseUrl + "/UpdateDevice", devicedata, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.deleteDevice = function (device) {
        return $http.post(baseUrl + "/DeleteDevice", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });

    }
});
app.controller('OtherController', function ($rootScope, $scope, $http, DeviceService) {

});

app.controller('DevicesController', function DevicesController($scope, $rootScope, $http, DeviceService) {

    $scope.details = { CustomerID: "ProtechTst" };
    loadAllDevices();
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
        $('#devicename').val('');
        $('#devicetype').val('');
        $('#powerconsumption').val('');
       
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    };

    $scope.canceldevice = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').addClass('hide');
        $('#devicename').val('');
        $('#devicetype').val('');
        $('#powerconsumption').val('');
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    }

    function loadAllDevices() {

        var promise = DeviceService.getAllDevices();
        promise.then(

            function (response) {
                $scope.deviceslist = response.data;
                $scope.alldevicesdata = $scope.deviceslist.data;
            },
            function (error) {
                $scope.alldevicesdata = null;

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
        $scope.devices = [];

        var devices = $scope.alldevicesdata;
        for (var i = 1; i <= 100; i++) {
            var device = devices[Math.floor(Math.random() * devices.length)];
            $scope.devices.push('device ' + i + ': ' + device);
        }

        $scope.pageChangeHandler = function (num) {
            console.log('devices page changed to ' + num);
        };
    }
    //Table Pagination Function 
    function OtherController($scope) {
        $scope.pageChangeHandler = function (num) {
            console.log('going to page ' + num);
        };
    }

    //Add New Device function
    $scope.insertdevice = function () {
          var devicename= $('#devicename').val();
        var devicetype= $('#devicetype').val();
        var powerconsumption = $('#powerconsumption').val();
        var powerconsumptionint = parseInt(powerconsumption);
        var ifexist = ($scope.alldevicesdata.find(x => x.device_name == devicename));
            if (ifexist == null) {
                var details = { Device_Name: devicename, Device_Type: devicetype, Power_Consumption: powerconsumptionint };
                var promisePost = DeviceService.insertDevice(details);
                promisePost.then(function (status, data) {
                    $('#devicename').val('');
                    $('#devicetype').val('');
                    $('#powerconsumption').val('');
                    $scope.savebtndis = true;
                    $('#nspagecontrols').addClass('hide');
                    $('#sucessdiv').removeClass('hide').html('Inserted Successfully');
                    $('.sucessdiv').removeClass('hide');
                    $('.errordiv').addClass('hide');
                    $('#errordiv').addClass('hide').html('');
                    loadAllDevices();
                }
                );
            }
            else {
                $('.errordiv').removeClass('hide');
                $('#errordiv').removeClass('hide').html('Device Name Already Exist');
            }

    }

    //Edit Existing Device function
    $scope.editdevice = function (deviceid) {
        $scope.deviceid = deviceid;
        var details = { Device_Id: deviceid };
        var promise = DeviceService.getDevicebyId(details);
        promise.then(

            function (response) {
                $scope.devicedata = response.data;
                $scope.singledevice = $scope.devicedata.data;
                console.log($scope.singledevice);
                $('#devicename').val($scope.singledevice.device_name);
                $('#devicetype').val($scope.singledevice.device_type);
                $('#powerconsumption').val($scope.singledevice.power_consumption);
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
    $scope.updatedevice = function () {
        var deviceid = $scope.deviceid;
        var devicename = $('#devicename').val();
        var devicetype = $('#devicetype').val();
        var powerconsumption = $('#powerconsumption').val();
        var powerconsumptionint = parseInt(powerconsumption);
        var details = { Device_Id: deviceid, Device_Name: devicename, Device_Type: devicetype, Power_Consumption: powerconsumptionint };
        var promisePost = DeviceService.updateDevice(details);
        promisePost.then(function (result) {
            $('#devicename').val('');
            $('#devicetype').val('');
            $('#powerconsumption').val('');
            $('#updatebtn').addClass('hide');
            $('#cancelbtn').addClass('hide');
            $('#savebtn').removeClass('hide');
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('Device is Updated ');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllDevices();
        }
        );

    }


    //Delete Existing Device function
    $scope.deletedevice = function (deviceid) {
        var details = { Device_Id: deviceid };
        var promise = DeviceService.deleteDevice(details);
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
                loadAllDevices();
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