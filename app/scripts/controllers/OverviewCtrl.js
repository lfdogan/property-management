(function() {
     function OverviewCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.allBills = Data.allBills();
         this.billsOwnerDraw = Data.billsOwnerDraw();
         this.billsRentIncome = Data.billsRentIncome();

         this.allMaintenance = Data.allMaintenance(); // the ARRAY of objects from the Firebase database
         this.filteredMaintenance = Data.filteredMaintenance();
         this.allPendingMaintenance = Data.allPendingMaintenance();
         this.allOpenMaintenance = Data.allOpenMaintenance();
         this.allClosedMaintenance = Data.allClosedMaintenance();
         
         this.latestStatement = Data.latestStatement();

         Data.followMyAccountLink();
         

         
         //sets top navigation link styling on page load
         Data.setNavLinkStyling("overview");
         
         
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
                     dataPoints: [
                         {  y: 1375, label: "2165 54th St"}
                     ]
                 },
                 {
                     type: "stackedColumn100",
                     legendText: "Still Owe",
                     showInLegend: "true",
                     indexLabel: "#percent %",
                     indexLabelPlacement: "inside",
                     indexLabelFontColor: "white",
                     yValueFormatString: "$#,###,###",
                     dataPoints: [
                         {  y: 0, label: "2165 54th St"}
                     ]
                 }
             ]
         });
         chart.render();
         


         
     }
 
     angular
         .module('propertyManagement')
         .controller('OverviewCtrl', ['Data', OverviewCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();