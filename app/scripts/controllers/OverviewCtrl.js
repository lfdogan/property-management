(function() {
     function OverviewCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         this.today = Data.globalToday;
         
         this.allBills = Data.allBills();
         this.billsOwnerDraw = Data.billsOwnerDraw();
         this.billsRentIncome = Data.billsRentIncome();

         this.allMaintenance = Data.allMaintenance(); // the ARRAY of objects from the Firebase database
         this.filteredMaintenance = Data.filteredMaintenance();
         this.allPendingMaintenance = Data.allPendingMaintenance();
         this.allOpenMaintenance = Data.allOpenMaintenance();
         this.allClosedMaintenance = Data.allClosedMaintenance();
         
         this.latestStatement = Data.latestStatement();
         this.leases216554THSTREECurrent = Data.leases216554THSTREECurrent();

         Data.followMyAccountLink();
         

         
         //sets top navigation link styling on page load
         Data.setNavLinkStyling("overview");

        /*
        * local function getMonthText
        * accepts a date in millisecond format
        * converts milliseconds date to date string object
        * gets month index# then add 1
        * searches Data.months array for the text of the particular month
        * returns a string ("January", "February", "March", etc.)
        */
        var getMonthText = function (milliseconds) {
            var dateObject = new Date(milliseconds);
            var monthNumber = dateObject.getMonth() + 1;
            for (var i = 0; i < Data.months.length; i++) {
                if (monthNumber == Data.months[i].number) return Data.months[i].key; 
            };
        };
         
        var todayMonthIndex = new Date(this.today).getMonth();
        var todayYearIndex = new Date(this.today).getFullYear();
        var todayMonthText = getMonthText(this.today);
        var todayMilliseconds = this.today;
         
        var mdyy = function (milliseconds) {
             var dateObject = new Date(milliseconds);
             var monthIndex = dateObject.getMonth();
             var monthNum = monthIndex+1;
             var day = dateObject.getDate();
             var fullYear = dateObject.getFullYear();
             var year = fullYear;
             if (fullYear > 2000) {
                 year = year-2000;
             } else year = year-1900;
             if (year < 10) {
                 return monthNum+"/"+day+"/0"+year;
             } else return monthNum+"/"+day+"/"+year;
         };
         
         
         
//         var chartReceivedData = [];//used in `do_b` chart render
//         var chartOweData = [];//used in `do_b` chart render
         var chartReceivedData = [  {  y: 1375, label: "2165 54th St"}  ];
         var chartOweData = [   {  y: 0, label: "2165 54th St"}   ];
         
         /* Create a chart using CanvasJS Library
         * chartData creates an array of the data
         * addColorSet determines each color for dataset
         * new CanvasJS.Chart creates the new chart with colorSet, title, and data
         * chart.render() displays the chart on the page
         */         
         CanvasJS.addColorSet("inc-exp-pro",
                [//colorSet Array
                "blue",
                "red"
                ]);
         var chart = new CanvasJS.Chart("chartContainer", {
             colorSet: "inc-exp-pro",
             title:{text: "August Rent Received"},  
             axisY:{
                title: "percentage",
                //valueFormatString: "#0.#,.",
            },
             data: [
                 {
                     type: "stackedColumn100",
                     legendText: "Received",
                     showInLegend: "true",
                     indexLabel: "#percent %",//text displayed on bar
                     indexLabelPlacement: "inside",
                     indexLabelFontColor: "white",
                     yValueFormatString: "$#,###,###",
                     dataPoints: chartReceivedData
//                                [  {  y: 1375, label: "2165 54th St"}  ]
                 },
                 {
                     type: "stackedColumn100",
                     legendText: "Still Owe",
                     showInLegend: "true",
                     indexLabel: "#percent %",
                     indexLabelPlacement: "inside",
                     indexLabelFontColor: "white",
                     yValueFormatString: "$#,###,###",
                     dataPoints: chartOweData
//                                [   {  y: 0, label: "2165 54th St"}   ]
                 }
             ]
         });
         chart.render();
         


         
     }
 
     angular
         .module('propertyManagement')
         .controller('OverviewCtrl', ['Data', OverviewCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();