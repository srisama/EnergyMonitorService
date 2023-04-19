var app = angular.module('DeviceUsageModule', ['angularUtils.directives.dirPagination']);

app.service('DeviceUsageService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    var longurl = 'http://localhost:2000/api/Devices/DeleteDevice/';

    //this.getAllDevices = function (device) {
    //    return $http.post(baseUrl + "/LocationGroups", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    //}
    this.GetAllDevices = function () {
        return $http.get(baseUrl + "/Devices");
    }

    this.GetAllDeviceusagebydeviceid = function (deviceusage) {
        return $http.post(baseUrl + "/EnergyConsumption", deviceusage, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.GetDeviceusagebyenergyid = function (deviceusage) {
        return $http.post(baseUrl + "/EnergyConsumptionbyId", deviceusage, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.insertDeviceUsage = function (deviceusage) {
        return $http.post(baseUrl + "/AddEnergyConsumption", deviceusage, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.updateDeviceusage = function (deviceusage) {
        return $http.put(baseUrl + "/UpdateEnergyConsumption", deviceusage, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.deleteDeviceusage = function (deviceusage) {
        return $http.post(baseUrl + "/DeleteEnergyConsumption", deviceusage, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
        //    return $http.delete(longurl + deviceid);
    }
});
app.controller('OtherController', function ($rootScope, $scope, $http, DeviceUsageService) {

});

app.controller('DeviceUsageController', function DeviceUsageController($scope, $rootScope, $http, DeviceUsageService) {

    getDevicesdropdown();
    //getDevicesdropdown_ddl();
    //var details = { device_id: 1 };
    //loadAllEnergyConsumption(details);
    $scope.currentPage = 1;
    $scope.pageSize = 50;
    $scope.device_id = "0";
    $scope.filterdevice = 0;
    //$scope.device_id_ddl = "0";
    //$scope.filterdevice_ddl = 0;
    $scope.savebtndis = true;
    $scope.updatebtndis = true;

    $rootScope.addControls = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').removeClass('hide');
        $('#energyconsumption').val('');
        $('#measurementdate').val('');
        $('#ddlhour').val(00);
        $scope.device_id = "0";
        $scope.filterdevice = 0;
        $scope.srchDevice = '';
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    };

    $scope.canceldeviceusage = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').addClass('hide');
        $('#energyconsumption').val('');
        $('#measurementdate').val('');
        $('#ddlhour').val(00);
        $scope.device_id = "0";
        $scope.filterdevice = 0;
        $scope.srchDevice = '';
        $('#updatebtn').addClass('hide');
        $('#cancelbtn').removeClass('hide');
        $('#savebtn').removeClass('hide');
        $scope.savebtndis = true;
        $scope.updatebtndis = true;
    }

    function loadAllEnergyConsumption(energyusage) {

        var promise = DeviceUsageService.GetAllDeviceusagebydeviceid(energyusage);
        promise.then(

            function (response) {
                $scope.energyconsumptionlist = response.data;
                $scope.allenergyconsumptiondata = $scope.energyconsumptionlist.data;
            },
            function (error) {
                $scope.allenergyconsumptiondata = null;

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
        $scope.energyconsumptions = [];

        var energyconsumptions = $scope.allenergyconsumptiondata;
        for (var i = 1; i <= 100; i++) {
            var energyconsumption = energyconsumptions[Math.floor(Math.random() * energyconsumptions.length)];
            $scope.energyconsumptions.push('energyconsumption ' + i + ': ' + energyconsumption);
        }

        $scope.pageChangeHandler = function (num) {
            console.log('energyconsumptions page changed to ' + num);
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
    $scope.insertdeviceusage = function () {
        var deviceid = $scope.device_id;
        var energyconsumption = $('#energyconsumption').val();
        var measurementdate = $('#measurementdate').val();
        var measurementhour = $('#measurementhour :selected').val();
        //var measurementtime1 = setdatetime2(measurementtime);
        var energyconsumptionint = parseInt(energyconsumption);
        var measurementhourint = parseInt(measurementhour);
        var details = { Device_Id: deviceid, Energy_Consumption: energyconsumptionint, Measurement_Date: measurementdate, Measurement_hour: measurementhourint };
        var promisePost = DeviceUsageService.insertDeviceUsage(details);
        promisePost.then(function (status, data) {
            $('#energyconsumption').val('');
            $('#measurementdate').val('');
            $('#ddlhour').val(00);

            $scope.device_id = "0";
            $scope.filterdevice = 0;
            $scope.srchDevice = '';
            $scope.savebtndis = true;
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('Inserted Successfully');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
        //    loadAllDevices();
        }
        );
    }

    //Edit Existing Device function
    $scope.editdeviceusage = function (energyid) {
        $scope.energy_id = energyid;
        var details = { Energy_Id: energyid };
        var promise = DeviceUsageService.GetDeviceusagebyenergyid(details);
        promise.then(

            function (response) {
                $scope.deviceusagedata = response.data;
                $scope.singledeviceusage = $scope.deviceusagedata.data;
                console.log($scope.singledeviceusage);
                $scope.getselecteddevice($scope.singledeviceusage.device_id, $scope.singledeviceusage.device_name);
                $('#energyconsumption').val($scope.singledeviceusage.energy_consumption);
                $('#measurementdate').val($scope.singledeviceusage.measurement_date);
                //var measurementhourint = parseInt($scope.singledeviceusage.measurement_hour);
                $('#ddlhour').val($scope.singledeviceusage.measurement_hour);

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

    //function for update device
    $scope.updatedeviceusage = function () {
        var energyid = $scope.energy_id;
        var energyconsumption = $('#energyconsumption').val();
        var measurementdate = $('#measurementdate').val();
        var measurementhour = $('#measurementhour :selected').val();
        //var measurementtime1 = setdatetime2(measurementtime);
        var energyconsumptionint = parseInt(energyconsumption);
        var measurementhourint = parseInt(measurementhour);
        var details = { Energy_Id: energyid, Energy_Consumption: energyconsumptionint, Measurement_Date: measurementdate, Measurement_hour: measurementhourint };
        var promisePost = DeviceUsageService.updateDeviceusage(details);
        promisePost.then(function (result) {
            $('#energyconsumption').val('');
            $('#measurementdate').val('');
            $('#ddlhour').val(00);
            $scope.device_id = "0";
            $scope.filterdevice = 0;
            $scope.srchDevice = '';
            $('#updatebtn').addClass('hide');
            $('#cancelbtn').addClass('hide');
            $('#savebtn').removeClass('hide');
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('DeviceUsage is Updated ');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllDevices();
        }
        );

    }


    //Delete Existing Device function
    $scope.deletedeviceusage = function (energyid) {
        var energyid = energyid;
        var details = { Energy_Id: energyid };
        var promise = DeviceUsageService.deleteDeviceusage(details);
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


    $rootScope.GetEnergyConsumption = function () {
        $scope.details = { Device_Id: $scope.device_id };
        loadAllEnergyConsumption($scope.details);

    }

    //function to call countryid and country for dropdown
    function getDevicesdropdown() {

        var promise = DeviceUsageService.GetAllDevices();
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
    $scope.getselecteddevice = function (id,name) {
        $scope.device_id = id;
        $scope.device_name = name;
        $scope.srchDevice = name;
        $scope.filterdevice = 0;
        $scope.details = { Device_Id: $scope.device_id };

        //loadAllEnergyConsumption($scope.details);
    //    $scope.finalvalidation();
    }



    //function to call countryid and country for dropdown
    function getDevicesdropdown_ddl() {

        var promise = DeviceUsageService.GetAllDevices();
        promise.then(

            function (response) {
                $scope.dropdownDevicesData_ddl = response.data;
                $scope.allDevicesdropdownData_ddl = $scope.dropdownDevicesData_ddl.data;
                console.log($scope.allDevicesdropdownData_ddl);
            },
            function (error) {
                $scope.allDevicesdropdownData_ddl = null;

            }
        );
    }
    //provincediv Function is using to Select value to Dropdown Function 
    $scope.devicediv_ddl = function () {
        $('#devicediv1_ddl').removeClass('hide');
        $scope.device_id_ddl = 0;
        $scope.device_name_ddl = '';
        $scope.srchDevice_ddl = '';
        $scope.filterdevice_ddl = 1;
        //    $scope.finalvalidation();
    }

    //For Search Dropdown items from list
    $scope.getfilterdevices_ddl = function () {
        $('#devicediv_ddl').removeClass('hide');
        $scope.filterdevice_ddl = 1;
        $scope.device_id_ddl = 0;
        //    $scope.finalvalidation();
    }

    //Getting ProvinceId and ProvinceName to Dropdown Function
    $scope.getselecteddevice_ddl = function (id, name) {
        $scope.device_id = id;
        $scope.device_name = name;
        $scope.srchDevice_ddl = name;
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