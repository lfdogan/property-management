(function() {
     function OverviewCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         months = Data.months;
         today = Data.globalToday;
         todayMonthIndex = Data.todayMonthIndex;
         todayYearIndex = Data.todayYearIndex;
         
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
         
        
         var chartReceivedData = [];//used in `do_b` chart render
         var chartOweData = [];//used in `do_b` chart render
/********************** function do_a *******************************/
         function do_a (callback){
             setTimeout(function(){
                //console.log( '`do_a`: this takes longer than `do_b`' );
//                 chartReceivedData = [  {  y: 1375, label: "2165 54th St"}  ];
//                 chartOweData = [   {  y: 0, label: "2165 54th St"}   ];
var leases216554THSTREERef = new Firebase('https://property-management-lfdogan.firebaseio.com/buildings/216554THSTREE/leases');
                var transactionsRef = new Firebase('https://property-management-lfdogan.firebaseio.com/bills');
                var buildingData = []; // building, rentOwed, received to be pushed into chartReceivedData and chartOweData
                
                /* Gather data for Rent Received Bar Chart
                * cycle through all leases at 2165 54th Street (leases216554THSTREERef)
                * for the current lease (moved in, didn't move out, not expired)
                * extract building abbreviation and monthly rent due and push into buildingObject
                * check if this month is the first month of lease. If yes override monthly rent due with 1st month's rent due
                * cycle through all transactions
                * for transactions that are for rent income (account=4000) 
                * check if the pay date occurred between 1st of month and today
                * ovverride received amount ($0) with rental income
                * push the building object into the building data array
                */
                console.log("today is",Data.mdyy(today));
                leases216554THSTREERef.once("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key();
                        var childData = childSnapshot.val();
                        //console.log("lease "+Data.mdyy(childData.leaseBegin)+"-"+Data.mdyy(childData.leaseEnd));
                        //check for current lease 
                        if (childData.leaseBegin < today && today < childData.leaseEnd){
                            //if lease has an early termination date, check that it hasn't occurred yet
                            if (!childData.earlyTermination || today < childData.earlyTermination) {
                                var buildingObject = {'building': childData.building, 'rent': childData.rent, 'received': 0};
                                //console.log("buildingObject",buildingObject);
                                //check if current month is leaseBegin month. if yes then use 'rent1mo' instead of 'rent'
                                if (todayMonthIndex == new Date(childData.leaseBegin).getMonth() && todayYearIndex == new Date(childData.leaseBegin).getFullYear()) {
                                    console.log("first month of lease - began " + Data.mdyy(childData.leaseBegin) + " owes $" + childData.rent1mo);
                                    buildingObject.rent = childData.rent1mo;
                                    //console.log("buildingObject",buildingObject);
                                };
                                transactionsRef.once("value", function(snapshot) {
                                    snapshot.forEach(function(childSnapshot) {
                                        var transactionskey = childSnapshot.key();
                                        var transactionschildData = childSnapshot.val();
                                        //check if transaction is rental income
                                        if (transactionschildData.account == 4000){
                                            //if the paydate occurred this month of this year and before today...
                                            if (todayMonthIndex == new Date(transactionschildData.payDate).getMonth() && todayYearIndex == new Date(transactionschildData.payDate).getFullYear() && transactionschildData.payDate < today){
                                                buildingObject.received = buildingObject.received + transactionschildData.amountPaid;
                                                //console.log("buildingObject",buildingObject);
                                            };
                                        };
                                    });
                                    buildingData.push(buildingObject);
                                    //console.log("buildingData",buildingData);
                                    
                                }); 
                                
                            };
                        };
                    });
                    //console.log("buildingData",buildingData);
                });
                    
                    


                /* Now we have arrays for rent due this month and rent paid this month. Calculate remaining owed.
                * cycle through the chartDueData array for and match up buildings.
                */
                for (var i=0; i < buildingData.length; i++) {
                    //console.log("received as of "+Data.mdyy(today)+": $"+buildingData[i].received);
                    var stillOwe = buildingData[i].rent - buildingData[i].received;
                    var oweObject = {'y': stillOwe, 'label': buildingData[i].building};
                    chartOweData.push(oweObject);
                    var receiveObject = {'y': buildingData[i].received, 'label': buildingData[i].building};
                    chartReceivedData.push(receiveObject);
                };    
               // console.log("chartOweData",chartOweData,"chartReceivedData",chartReceivedData);

                //rentChart array shows this month: each building with the amount due in rent and amount received
                /*
                //old method for rentChart with static values
                var rentChart1 = [
                    {  'building': '2165 54th St', 'rent': 1000, 'received': 1000    }, 
                    //{  'building': 'parking', 'due': 100, 'received': 95    },
                ];
                */
                 callback && callback();
             }, 500 );
         }
 /********************** END function do_a *******************************/        
         
/********************** function do_b *******************************/
         /* Create a chart using CanvasJS Library
         * chartData creates an array of the data
         * addColorSet determines each color for dataset
         * new CanvasJS.Chart creates the new chart with colorSet, title, and data
         * chart.render() displays the chart on the page
         */
        function do_b () {
            //console.log( '`do_b`: now we can make sure `do_b` comes out after `do_a`' );       
             CanvasJS.addColorSet("inc-exp-pro",
                    [//colorSet Array
                    "blue", //money received
                    "red" //money still owe
                    ]);
             var chart = new CanvasJS.Chart("chartContainer", {
                 colorSet: "inc-exp-pro",
                 title:{text: Data.getMonthText(today) + " Rent Received"},
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
        };
 /********************** END function do_b *******************************/    



        do_a( function(){
            do_b();
        });
         


         
     }
 
     angular
         .module('propertyManagement')
         .controller('OverviewCtrl', ['Data', OverviewCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();