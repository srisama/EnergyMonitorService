var app = angular.module('EnergyUsageSummaryModule', ['angularUtils.directives.dirPagination']);

app.service('EnergyUsageSummaryService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    var longurl = 'http://localhost:2000/api/Devices/DeleteDevice/';

    //this.getAllDevices = function (device) {
    //    return $http.post(baseUrl + "/LocationGroups", device, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    //}
    this.GetAllDevices = function () {
        return $http.get(baseUrl + "/Devices");
    }

    this.GetAllEnergyUsageSummaries = function () {
        return $http.get(baseUrl + "/EnergyUsageSummary");
    }

    this.getConsumptionsbyDates = function (data) {
        return $http.post(baseUrl + "/EnergyConsumptionbyTwoDates", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.GetEnergyUsageSummarybyid = function (data) {
        return $http.post(baseUrl + "/GetEnergyUsageSummarybyId", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.insertEnergyUsageSummary = function (data) {
        return $http.post(baseUrl + "/AddEnergyUsageSummary", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }
    this.updateEnergyUsageSummary = function (data) {
        return $http.put(baseUrl + "/UpdateEnergyUsageSummary", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

    this.deleteEnergyUsageSummary = function (data) {
        return $http.post(baseUrl + "/DeleteEnergyUsageSummary", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
        //    return $http.delete(longurl + deviceid);
    }
});
app.controller('OtherController', function ($rootScope, $scope, $http, EnergyUsageSummaryService) {

});

app.controller('EnergyUsageSummaryController', function EnergyUsageSummaryController($scope, $rootScope, $http, EnergyUsageSummaryService) {

    getDevicesdropdown();
    //getDevicesdropdown_ddl();
    //var details = { device_id: 1 };
    //loadAllEnergyUsageSummary();
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
        $('#summarydate').val('');
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

    $scope.cancelenergyusagesummary = function () {
        $('#sucessdiv').addClass('hide').html('');
        $('#errordiv').addClass('hide').html('');
        $('.sucessdiv').addClass('hide');
        $('.errordiv').addClass('hide');
        $('#nspagecontrols').addClass('hide');
        $('#summarydate').val('');
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

    $rootScope.GetEnergyUsage = function () {
        var storecode = $('#ddlstorecode :selected').text();
        var fromdate = $('#fromdate').val();
        var todate = $('#todate').val();

        $scope.details = { Device_Id: $scope.device_id, From_Date: fromdate, To_Date: todate, Store_Code: storecode };
        loadAllEnergyUsageSummarybyDates($scope.details);

    }

    function loadAllEnergyUsageSummarybyDates(data) {
        var details = { Device_Id: 1 };
        var promise = EnergyUsageSummaryService.getConsumptionsbyDates($scope.details);
        promise.then(

            function (response) {
                $scope.energyusagesummarylist = response.data;
                $scope.allenergyusagesummarydata = $scope.energyusagesummarylist.data;
            },
            function (error) {
                $scope.allenergyusagesummarydata = null;

            }
        );
    }


    //function loadAllEnergyUsageSummary(data) {
    //    var details = { Device_Id: 1 };
    //    var promise = EnergyUsageSummaryService.GetAllEnergyUsageSummaries();
    //    promise.then(

    //        function (response) {
    //            $scope.energyusagesummarylist = response.data;
    //            $scope.allenergyusagesummarydata = $scope.energyusagesummarylist.data;
    //        },
    //        function (error) {
    //            $scope.allenergyusagesummarydata = null;

    //        }
    //    );
    //}

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    //Table Page Size Function 
    function MyController($scope) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.energyusagesummaries = [];

        var energyusagesummaries = $scope.allenergyusagesummarydata;
        for (var i = 1; i <= 100; i++) {
            var energyusagesummay = energyusagesummaries[Math.floor(Math.random() * energyusagesummaries.length)];
            $scope.energyusagesummaries.push('energyusagesummay ' + i + ': ' + energyusagesummay);
        }

        $scope.pageChangeHandler = function (num) {
            console.log('energyusagesummaries page changed to ' + num);
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

        var array = storedatetime.split('-');
        var day = array[0];
        var month = array[1];
        var year = array[2];
        var dateformat = year + '-' + month + '-' + day;

        //date.setDate(day);
        //date.setMonth(month);
        //date.setFullYear(year);
        //var date11 = date.toISOString();
        //alert(date11);
        //return date11;
        return dateformat;
    }


    //Add New Deviceusage function
    $scope.insertenergyusagesummary = function () {
        var deviceid = $scope.device_id;
        var summarydate = $('#summarydate').val();
        var totalenergyusage = $('#totalenergyusage').val();
        //var measurementtime1 = setdatetime2(measurementtime);
        var totalenergyusageint = parseInt(totalenergyusage);
        //var summarydate1 = setdatetime2(summarydate);
        var details = { Device_Id: deviceid, Summary_Date: summarydate, Total_Energy_Usage: totalenergyusageint };
        var promisePost = EnergyUsageSummaryService.insertEnergyUsageSummary(details);
        promisePost.then(function (status, data) {
            $('#summarydate').val('');
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
            loadAllEnergyUsageSummary();
        }
        );
    }

    //Edit Existing Device function
    $scope.editenergyusagesummary = function (summaryid) {
        $scope.summaryid = summaryid;
        var details = { Summary_Id: summaryid };
        var promise = EnergyUsageSummaryService.GetEnergyUsageSummarybyid(details);
        promise.then(

            function (response) {
                $scope.energyusagedata = response.data;
                $scope.singleenergyusage = $scope.energyusagedata.data;
                console.log($scope.singleenergyusage);
                $scope.getselecteddevice($scope.singleenergyusage.device_id, $scope.singleenergyusage.device_name);
                $('#summarydate').val($scope.singleenergyusage.summary_date);
                $('#totalenergyusage').val($scope.singleenergyusage.total_energy_usage);
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
    $scope.updateenergyusagesummary = function () {
        var summaryid = $scope.summaryid;
        var deviceid = $scope.device_id;
        var summarydate = $('#summarydate').val();
        var totalenergyusage = $('#totalenergyusage').val();
        totalenergyusageint = parseInt(totalenergyusage);
        var details = { Summary_Id: summaryid, Device_Id: deviceid, Summary_Date: summarydate, Total_Energy_Usage: totalenergyusageint };
        var promisePost = EnergyUsageSummaryService.updateEnergyUsageSummary(details);
        promisePost.then(function (result) {
            $('#summarydate').val('');
            $('#totalenergyusage').val('');
            $scope.device_id = "0";
            $scope.filterdevice = 0;
            $scope.srchDevice = '';
            $('#updatebtn').addClass('hide');
            $('#cancelbtn').addClass('hide');
            $('#savebtn').removeClass('hide');
            $('#nspagecontrols').addClass('hide');
            $('#sucessdiv').removeClass('hide').html('EnergyUsageSummary is Updated ');
            $('.sucessdiv').removeClass('hide');
            $('.errordiv').addClass('hide');
            $('#errordiv').addClass('hide').html('');
            loadAllEnergyUsageSummary();
        }
        );

    }


    //Delete Existing Device function
    $scope.deleteenergyusagesummary = function (summaryid) {
        var summaryid = summaryid;
        var details = { Summary_Id: summaryid };
        var promise = EnergyUsageSummaryService.deleteEnergyUsageSummary(details);
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
                loadAllEnergyUsageSummary();
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

        var promise = EnergyUsageSummaryService.GetAllDevices();
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
        $rootScope.allEnergyUsageDayWiseDownloadData = $scope.allenergyusagesummarydata;
        var fname = 'EnergyUsageDayWise' + '.xls';
        var tab_text = "<table border='1px'>";
        tab_text += "<tr><th>" + 'Summary Id' + "</th><th>" + 'Device Name' + "</th><th>" + 'Summary Date' + "</th><th>" + 'Total Energy Usage' + "</th><th>" + 'Store Code' + "</th></tr>";

        $.each($rootScope.allEnergyUsageDayWiseDownloadData, function (i, j) {
          
            tab_text += "<tr><td>" + j.summary_id + "</td><td>" + j.device_name + "</td><td>" + j.summary_date + "</td><td>" + j.total_energy_usage + "</td><td>" + j.store_code + "</td></tr>";
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
        $rootScope.allEnergyUsageDayWiseDownloadData = $scope.allenergyusagesummarydata;
        var pagetitle = 'EnergyUsageDayWise';
        $('#' + 'printgrid').find('#pagining').hide();

        $('#' + 'printgrid').find('#dumxls').hide();
        var divToPrint = document.getElementById('printgrid');


        var tab_text = "<table class='table table-sm m-0'>";
        tab_text += "<thead><tr><th>" + 'Summary Id' + "</th><th>" + 'Device Name' + "</th><th>" + 'Summary Date' + "</th><th>" + 'Total Energy Usage' + "</th><th>" + 'Store Code' + "</th></tr></thead><tbody>";
        $.each($rootScope.allEnergyUsageDayWiseDownloadData, function (i, j) {
            tab_text += "<tr><td>" + j.summary_id + "</td><td>" + j.device_name + "</td><td>" + j.summary_date + "</td><td>" + j.total_energy_usage + "</td><td>" + j.store_code + "</td></tr>";
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