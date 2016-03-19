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
         this.latestStatement = Data.latestStatement();
         this.leases216554THSTREE = Data.leases216554THSTREE();
         this.leases216554THSTREECurrent = Data.leases216554THSTREECurrent();
         //this.allApplicants = Data.allApplicants();
         
         this.Data = Data;
         this.months = Data.months;

         this.myBuildings = Data.myBuildings();
         
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
         
         //on page load set tables as hidden
         document.getElementById("former-tenants-table").style.display = "none";
         document.getElementById("inspection-reports-table").style.display = "none";
         //on click, show or hide the tables
         this.show_hide = function(id){
             var toggle = document.getElementById(id);
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

/********************** variables for do_a and do_b *******************************/
         var chartIncomeData = [];
         var chartExpenseData = [];
         var chartProfitData = [];
         //profit chart title doesn't update when statement period is changed
         var profitChartTitle = Data.mdyy(Data.beginDateRange) + "-" + Data.mdyy(this.endDateRange)+" Profit Overview";
/********************** END variables for do_a and do_b *******************************/
         
/********************** function do_a *******************************/
         function do_a (callback){
             setTimeout(function(){
                 console.log( '`do_a`: this takes longer than `do_b`' );
                 chartIncomeData.unshift({  y: 3378.95 , label: "8/14/15" });//label: new Date(2015, 07, 14)});//"8/14/15"
                 chartIncomeData.unshift({  y: 0, label: "7/15/15" });
                 chartIncomeData.unshift({  y: 1272.97, label: "6/15/15" });
                 chartIncomeData.unshift({  y: 1312.18, label: "5/15/15" });
                 chartIncomeData.unshift({  y: 1328.04, label: "4/15/15"});
                 chartIncomeData.unshift({  y: 1386.42, label: "3/13/15"});
                 chartIncomeData.unshift({  y: 1250, label: "2/13/15"});
                 chartIncomeData.unshift({  y: 1323.33, label: "1/15/15"});
                 chartExpenseData.unshift({  y: 1322.50 , label: "8/14/15" });//label: new Date(2015, 07, 14)});//"8/14/15"
                 chartExpenseData.unshift({  y: 538.10, label: "7/15/15" });
                 chartExpenseData.unshift({  y: 261.45, label: "6/15/15" });
                 chartExpenseData.unshift({  y: 100, label: "5/15/15" });
                 chartExpenseData.unshift({  y: 100, label: "4/15/15"});
                 chartExpenseData.unshift({  y: 100, label: "3/13/15"});
                 chartExpenseData.unshift({  y: 100, label: "2/13/15"});
                 chartExpenseData.unshift({  y: 265.96, label: "1/15/15"});
                 chartProfitData.unshift({  y: 2205.85 , label: "8/14/15" });//label: new Date(2015, 07, 14)});//"8/14/15"
                 chartProfitData.unshift({  y: 0, label: "7/15/15" });
                 chartProfitData.unshift({  y: 1011.52, label: "6/15/15" });
                 chartProfitData.unshift({  y: 1212.18, label: "5/15/15" });
                 chartProfitData.unshift({  y: 1228.04, label: "4/15/15"});
                 chartProfitData.unshift({  y: 1286.42, label: "3/13/15"});
                 chartProfitData.unshift({  y: 1150.00, label: "2/13/15"});
                 chartProfitData.unshift({  y: 1057.37, label: "1/15/15"});
                 callback && callback();
             }, 500 ); //do_a() gathers data. wait # of milliseconds to begin do_b() (creating chart from gathered data)
         }
 /********************** END function do_a *******************************/        
         
/********************** function do_b *******************************/
         function do_b () {
             //console.log( '`do_b`: now we can make sure `do_b` comes out after `do_a`' );
             
             /* Create a chart using CanvasJS Library
             * chartData creates an array of the data
             * addColorSet determines each color for dataset
             * new CanvasJS.Chart creates the new chart with colorSet, title, and data
             * chart.render() displays the chart on the page
             */
             CanvasJS.addColorSet("inc-exp-pro",
                [//colorSet Array
                 "blue",
                 "red",
                 "green"               
             ]);
             var chart = new CanvasJS.Chart("chartContainer", {
                 colorSet: "inc-exp-pro",
                 title:{	text: profitChartTitle		},
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
                         dataPoints: chartIncomeData
                         //[{label: "income", y: 11251.89}]
                     },
                     {
                         type: "column",
                         legendText: "Expenses",
                         showInLegend: "true",
                         yValueFormatString: "Expenses $#,###,###.##",
                         dataPoints: chartExpenseData
                         //[{label: "expenses", y: 2788.01}]
                     },  
                     {
                         type: "column",
                         legendText: "Profit",
                         showInLegend: "true",
                         //indexLabel: "#total",
                         yValueFormatString: "Profit $#,###,###.##",
                         //indexLabelPlacement: "outside",
                         dataPoints: chartProfitData
                         //[{label: "profit", y: 9151.38}]
                     }
                 ]
             });
             chart.render();    
     };
 /********************** END function do_b *******************************/    



        do_a( function(){
            do_b();
        });
         
         


/************************** FOR ADDING NEW STATEMENTS **************************/
         /*
         var statementsRef = new Firebase("https://property-management-lfdogan.firebaseio.com/statements");
         
         var prevEndDate = document.getElementById('prevEndDate');     
         var monthED = document.getElementById('monthED');
         var dayED = document.getElementById('dayED');
         var yearED = document.getElementById('yearED');
         var hourED = document.getElementById('hourED');
         var minuteED = document.getElementById('minuteED');
         var portfolio = document.getElementById('portfolio');
         var btnNewStatement = document.getElementById('btnNewStatement'); //add button for NewStatement
         var postStatementID;
         var newPostStatementRef;
         
         btnNewStatement.addEventListener('click', function(){
             var beginDate = Number(prevEndDate.value) + 1; // begindate is the exact time as previous statement end date so add 1
             var range = "";
             // Takes a date in milliseconds and converts it to m/d/yy format, adds that to "range" variable
             var stripMS = function(ms){
                 var string = new Date(ms); // converts milliseconds to string object
                 var month = string.getMonth() + 1; // gets month index# then add 1
                 var day = string.getDate(); // gets day of month
                 var year = string.getFullYear(); // gets day of month
                 if (year > 2000) { //strips first 2 digits from year
                     year = year-2000;
                 } else year = year-1900;
                 range = range + month+"/"+day+"/"+year;
             }
             stripMS(beginDate);
             range = range + " - ";
             var stringED = new Date(monthED.value +" "+ dayED.value +" "+ yearED.value +" "+ hourED.value +":"+minuteED.value+":000"); //format is Jan 17 2016 09:51:201
             endDate = stringED.valueOf(); // Return the primitive value of a Date object (in milliseconds)
             stripMS(endDate);
             newPostStatementRef = statementsRef.push();
             newPostStatementRef.set({//entered by user
                 beginDate: Number(beginDate), 
                 endDate: Number(endDate),
                 portfolio: portfolio.value, //for owner draw only
                 range: range,
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postStatementID = newPostStatementRef.key();
         });
         
/************************** END - FOR ADDING NEW STATEMENTS **************************/

/************************** FOR ADDING NEW TENANTS TO 2165 54TH STREET **************************/
         /*
         var leases216554THSTREERef = new Firebase("https://property-management-lfdogan.firebaseio.com/buildings/leases");
         
         var tenantName = document.getElementById('tenantName');
         var building = document.getElementById('building');
         var monthLB = document.getElementById('monthLB');
         var dayLB = document.getElementById('dayLB');
         var yearLB = document.getElementById('yearLB');
         var monthLE = document.getElementById('monthLE');
         var dayLE = document.getElementById('dayLE');
         var yearLE = document.getElementById('yearLE');
         var rent = document.getElementById('rent');
         var moveIn = document.getElementById('moveIn');
         var moveOut = document.getElementById('moveOut');
         
         var btnNewTenant = document.getElementById('btnNewTenant'); //add button for NewStatement
         var postTenantID;
         var newPostTenantRef;
         btnNewTenant.addEventListener('click', function(){
             console.log("Add New Tenant: " + tenantName.value);
             
             var convertDateInputs = function(monthString, day, year, timeofday) {
                 var dateString = "";
                 if (timeofday == "begin") {
                      dateString = monthString +" "+ day +" "+ year +" 00:00:001";
                 } else dateString = monthString +" "+ day +" "+ year +" 23:59:999";
                 var dateObj = new Date(dateString); // formats text string into date object
                 return dateObj.valueOf(); // Return the primitive value of a Date object (in milliseconds)
             };
             var leaseBegin = convertDateInputs(monthLB.value, dayLB.value, yearLB.value, "begin");
             var leaseEnd = convertDateInputs(monthLE.value, dayLE.value, yearLE.value, "end");
             if (building.value == "216554THSTREE") {
                 newPostTenantRef = leases216554THSTREERef.push();
             }
             newPostTenantRef.set({//entered by user
                 tenantName: tenantName.value,
                 building: building.value,
                 moveIn: moveIn.value,
                 moveOut: moveOut.value,
                 leaseBegin: Number(leaseBegin), 
                 leaseEnd: Number(leaseEnd), 
                 rent: Number(rent.value),
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postTenantID = newPostTenantRef.key();
             tenantName.value = '';
         });
         
/************************** END - FOR ADDING NEW TENANTS TO 2165 54TH STREET **************************/       
         
         
/************************** FOR ADDING NEW APPLICANTS **************************/
         /*
         var applicantsRef = new Firebase("https://property-management-lfdogan.firebaseio.com/tenants");
         
         
         var date_month = document.getElementById('date_month');
         var date_day = document.getElementById('date_day');
         var date_year = document.getElementById('date_year');
         
         var applicantName = document.getElementById('applicantName'); 
         var applicationDate = document.getElementById('applicationDate');
         var building = document.getElementById('building');
         var btnNewApplicant = document.getElementById('btnNewApplicant'); //add button
         var postApplicantID;
         var newPostApplicantRef;
         btnNewApplicant.addEventListener('click', function(){
             console.log("New Tenant: " + tenantName.value);
             var dob = new Date(date_month.value +" "+ date_day.value +" "+ date_year.value +" 12:00:00:000");
             newPostApplicantRef = applicantsRef.push();
             newPostApplicantRef.set({//entered by user
                 applicantName: applicantName.value,
                 dob: dob.getTime(), //convert text date to ms
                 applicationDate: Number(applicationDate.value),
                 building: building.value, //for owner draw only
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postApplicantID = newPostApplicantRef.key();
             applicantName.value = '';
         });
         
/************************** END - FOR ADDING NEW APPLICANTS **************************/
         
         
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