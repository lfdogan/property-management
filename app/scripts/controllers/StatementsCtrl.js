(function() {
     function StatementsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;

         this.allStatements = Data.allStatements(); // the ARRAY of objects from the Firebase database
         this.filteredStatements = Data.filteredStatements();
         
         this.allBills = Data.allBills();
         this.filteredBills = Data.filteredBills();
         
         this.inspections_two = Data.inspections_two();
         this.allInspections = Data.allInspections();
         
         this.Data = Data;
         
         Data.followMyAccountLink();


         //sets top navigation link styling on page load
         Data.setNavLinkStyling("documents");
         
         //will update data when user clicks on a date range selection
         var StatementsCtrl = this;
         Data.onTableViewChange(function () {
             //console.log("run StatementsCtrl.onTableViewChange()");
             StatementsCtrl.filteredStatements = Data.filteredStatements();
             StatementsCtrl.beginDateRange = Data.beginDateRange; //updates begin date on html after changing selection
             StatementsCtrl.endDateRange = Data.endDateRange;  //updates end date on html after changing selection
             StatementsCtrl.setRange = Data.globalNumDays;
             StatementsCtrl.setColumnSort = Data.globalcolumnToSortBy;
         } );
         
         var tenants = document.getElementById("former-tenants-table");
         tenants.style.display = "none";
         var inspection = document.getElementById("inspection-reports-table");
         inspection.style.display = "none";
        
         this.show_hide = function(id){
             var toggle = document.getElementById(id);
             //console.log("toggle", id);
             if (toggle.style.display == "table"){
                 toggle.style.display = "none";
             } else {
                 toggle.style.display = "table";
             }
         };


              
                  
         /* Create a chart using CanvasJS Library
         * chartData creates an array of the data
         * addColorSet determines each color for dataset
         * new CanvasJS.Chart creates the new chart with colorSet, title, and data
         * chart.render() displays the chart on the page
         */
         var chartData = function(){
             var dataPoints = [];
             dataPoints.push({label: "income", y: 11251.89});
             dataPoints.push({label: "expenses", y: 2788.01});
             dataPoints.push({label: "profit", y: 9151.38});
             return dataPoints;
         };
         var chartIncomeData = function(){
             var dataPoints = [];
                dataPoints.unshift({  y: 3378.95 , label: "8/14/15" });//label: new Date(2015, 07, 14)});//"8/14/15"
                dataPoints.unshift({  y: 0, label: "7/15/15" });
                dataPoints.unshift({  y: 1272.97, label: "6/15/15" });
                dataPoints.unshift({  y: 1312.18, label: "5/15/15" });
                dataPoints.unshift({  y: 1328.04, label: "4/15/15"});
                dataPoints.unshift({  y: 1386.42, label: "3/13/15"});
                dataPoints.unshift({  y: 1250, label: "2/13/15"});
                dataPoints.unshift({  y: 1323.33, label: "1/15/15"});
             return dataPoints;
         };
         var chartExpenseData = function(){
             var dataPoints = [];
                dataPoints.unshift({  y: 1322.50 , label: "8/14/15" });//label: new Date(2015, 07, 14)});//"8/14/15"
                dataPoints.unshift({  y: 538.10, label: "7/15/15" });
                dataPoints.unshift({  y: 261.45, label: "6/15/15" });
                dataPoints.unshift({  y: 100, label: "5/15/15" });
                dataPoints.unshift({  y: 100, label: "4/15/15"});
                dataPoints.unshift({  y: 100, label: "3/13/15"});
                dataPoints.unshift({  y: 100, label: "2/13/15"});
                dataPoints.unshift({  y: 265.96, label: "1/15/15"});
             return dataPoints;
         };
         var chartProfitData = function(){ //.push adds to end of array, .unshift adds to beginning
             var dataPoints = [];
                dataPoints.unshift({  y: 2205.85 , label: "8/14/15" });//label: new Date(2015, 07, 14)});//"8/14/15"
                dataPoints.unshift({  y: 0, label: "7/15/15" });
                dataPoints.unshift({  y: 1011.52, label: "6/15/15" });
                dataPoints.unshift({  y: 1212.18, label: "5/15/15" });
                dataPoints.unshift({  y: 1228.04, label: "4/15/15"});
                dataPoints.unshift({  y: 1286.42, label: "3/13/15"});
                dataPoints.unshift({  y: 1150.00, label: "2/13/15"});
                dataPoints.unshift({  y: 1057.37, label: "1/15/15"});
             return dataPoints;
         };
         CanvasJS.addColorSet("inc-exp-pro",
                [//colorSet Array
                "blue",
                "red",
                "green"               
                ]);
         /*
         var chart = new CanvasJS.Chart("chartContainer", {
             colorSet: "inc-exp-pro",
             title: {text: "Profit Overview"},
             data: [{
                 type: "bar",
                 dataPoints: chartData()
             }]
         });
         */
        var chart = new CanvasJS.Chart("chartContainer", {
            colorSet: "inc-exp-pro",
            title:{	text: "2015 Profit Overview"		},
            axisY:{
                //title:"Coal (bn tonnes)",
                valueFormatString: "$#,###,###",
            },
            data: [
                {
                    type: "column",
                    legendText: "Income",
                    showInLegend: "true",
                    yValueFormatString: "Income $#,###,###.##",
                    dataPoints: chartIncomeData()
                },
                {
                    type: "column",
                    legendText: "Expenses",
                    showInLegend: "true",
                    yValueFormatString: "Expenses $#,###,###.##",
                    dataPoints: chartExpenseData()
                },  
                {
                    type: "column",
                    legendText: "Profit",
                    showInLegend: "true",
                    //indexLabel: "#total",
                    yValueFormatString: "Profit $#,###,###.##",
                    //indexLabelPlacement: "outside",
                    dataPoints: chartProfitData()
                }
            ]
        });
         chart.render();


     }
 
     angular
         .module('propertyManagement')
         .controller('StatementsCtrl', ['Data', StatementsCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();

/* 1/12/16 when moving functions out of BillsCtrl.js into Message.js you must have:
function BillsCtrl(Bills)
this.Bills = Bills;
.controller('BillsCtrl', ['Bills', BillsCtrl]);
along with the correct path in the html ( {{ bills.Bills.labelPriority(bills.priority) }} )
*/