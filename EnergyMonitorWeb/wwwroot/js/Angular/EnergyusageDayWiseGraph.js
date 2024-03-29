﻿var app = angular.module('EnergyUsageDayWiseGraphModule', ['ng-fusioncharts','angularUtils.directives.dirPagination']);

app.service('EnergyUsageDayWiseGraphService', function ($http) {
    /* alert("after service");*/
    var baseUrl = 'http://localhost:2005';//44352
    var longurl = 'http://localhost:2000/api/Devices/DeleteDevice/';


    this.getAllDevices = function () {
        return $http.get(baseUrl + "/Devices");
    }
    this.getConsumptionsbyDates = function (data) {
        return $http.post(baseUrl + "/EnergyConsumptionbyTwoDates", data, { headers: { 'Content-Type': 'application / json, text / plain, */*' } });
    }

});
app.controller('OtherController', function ($rootScope, $scope, $http, EnergyUsageDayWiseGraphService) {

});

app.controller('EnergyUsageDayWiseGraphController', function EnergyUsageDayWiseGraphController($scope, $rootScope, $http, EnergyUsageDayWiseGraphService) {

    $scope.details = { CustomerID: "ProtechTst" };
    getDevicesdropdown();
    //loadAllDevices();
    $scope.currentPage = 1;
    $scope.pageSize = 50;
    $scope.savebtndis = true;
    $scope.updatebtndis = true;

    $scope.dategraphDataSource = {};


    $scope.renderFusionChart = function (caption, xaxisname, yaxisname, data) {
        console.log(data);
        var fusioncharts = {
            "chart": {
                //  "type":"column2d",
                // "type": "pie2d",
                "caption": caption,
                "subCaption": '',
                "captionFontSize": "12",
                "captionFontColor": "#00A4EF",
                "subcaptionFontSize": "12",
                "subcaptionFontColor": "#00A4EF",
                "subcaptionFontBold": "0",
                "paletteColors": "#3282b7,#f9af8c",
                "bgColor": '#29293c',
                "bgAlpha": "100",
                "canvasbgColor": '#29293c',
                "canvasbgAlpha": "100",
                "showBorder": "0",
                "showShadow": "0",
                "showCanvasBorder": "0",
                "showPlotBorder": "1",
                "inheritPlotBorderColor": "1",
                "plotBorderThickness": "1",
                "usePlotGradientColor": "0",
                "legendBorderAlpha": "50",
                "legendShadow": "0",
                //"showAxisLines": "5",
                "showAlternateHGridColor": "0",
                "divlineThickness": "0",
                "divLineIsDashed": "0",
                "divLineDashLen": "0",
                "divLineGapLen": "0",
                "xAxisName": xaxisname,
                "yAxisName": yaxisname,
                "xAxisNameFontColor": "#cac3c3",
                "yAxisNameFontColor": "#cac3c3",
                "xAxisNameFontSize": "12px",
                "yAxisNameFontSize": "12px",
                "labelFontColor": "#ffffff",
                "valueFontColor": "#00ff00",
                "yAxisLabelFontColor": "#633563",
                "yAxisNameFontColor": "#ffffff",
                "yAxisValueFontColor": "#ffffff",
                "baseFont": "Arial",
                "baseFontSize": "11",
                "showValues": "1",

            },
            "data": data  //$scope.gethourgraphdata()
        }
        return fusioncharts;
    }

    $rootScope.GetEnergyUsage = function () {
        var storecode = $('#ddlstorecode :selected').text();
        var fromdate = $('#fromdate').val();
        var todate = $('#todate').val();

        $scope.details = { Device_Id: $scope.device_id, From_Date: fromdate, To_Date: todate, Store_Code: storecode };
        loadAllEnergyConsumptionFromDates($scope.details);

    }

    function loadAllEnergyConsumptionFromDates(data) {
        // $scope.details = { Device_Id: 8, Measurement_Date:'2023-04-16' };
        var promise = EnergyUsageDayWiseGraphService.getConsumptionsbyDates($scope.details);
        promise.then(

            function (response) {
                $scope.energyconsumptionlist = response.data;
                $scope.allenergyconsumptiondata = $scope.energyconsumptionlist.data;

                $scope.getdategraphdata();

                $scope.dategraphDataSource = $scope.renderFusionChart('Daily Consumption', 'Day Wise', 'Consumption ', $scope.getdategraphdata());

                //$scope.renderFusionChart('Hourly Consumption', '00-24 Hours', 'Consumption ', $scope.allenergyconsumptiondata);
            },
            function (error) {
                $scope.allenergyconsumptiondata = null;

            }
        );
    }

    //$scope.HourlyGraph = []
    $scope.getdategraphdata = function () {
        var cat = "[";
        $.each($scope.allenergyconsumptiondata, function (i, e) {
            cat += (cat == '[' ? '' : ',') + "{" + '"label":"' + String(e.summary_date) + '","value":"' + String(e.total_energy_usage) + '"' + "}";
        });
        cat += "]";
        /*   console.log(cat);*/
        return jQuery.parseJSON(cat);
        console.log(cat);
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

    //function to call countryid and country for dropdown
    function getDevicesdropdown() {

        var promise = EnergyUsageDayWiseGraphService.getAllDevices();
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