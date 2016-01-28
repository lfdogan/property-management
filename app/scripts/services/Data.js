//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. 


        
        
        
        //private variables, attributes, functions begin with "var"
        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');    
        var maintenanceRef = rootRef.child('maintenance');


        
        //initial values of start and end date range
                //initial values of start and end date range
//        var startNegativeRange = 1439697599999; //negative numbers will order descending but start/end will need to switch
//        var endNegativeRange = 1433131200000; //negative 6/1/15
        var startRange = 1433131200000; // custom start date is 6/1/15
        var endRange = 1439697599999; // custom end date is 8/15/15
        var today = 1439823680000; // 'current' date is 08/17/2015 11:01:20
        var thirtyDays = 1000 * 60 * 60 * 24 * 30;// 1000ms/sec * 60sec/min * 60min/hr * 24hr/day * 30days
        var numDays = 9999;

        // array used for changeDateRange()
        var onDateRangeChangeHandlers = [];

     
// for a factory service: create an object, add properties to it, then return that same object. 
        //var Data = $firebaseArray.$extend({// these methods exist on the prototype, so we can access the data using `this`
      
        var Data = {
            allBills: function() {//get all bills from database
                return $firebaseArray(billsRef
                                      .orderByChild("billNumber"));
            },
            allStatements: function() {
                return $firebaseArray(statementsRef
                                      .orderByChild("endDate"));
            },
            allMaintenance: function() {
                return $firebaseArray(maintenanceRef
                                      .orderByChild("workOrderNumber"));
            },
            billsOwnerDraw: function() {
                return $firebaseArray(billsRef
                                     .orderByChild("transactionType")
                                     .equalTo("Owner Draw"));
            },
            billsRentIncome: function() {
                return $firebaseArray(billsRef
                                     .orderByChild("transactionType")
                                     .equalTo("Rent"));
            },
//            filteredBills: function(start, end){
//                return $firebaseArray(billsRef
//                                      //.startAt(startRange)
//                                      //.endAt(endRange)
//                                      .orderByChild("payDate"));
//            },
            filteredBills: function(){
                return $firebaseArray(billsRef
                                      .startAt(startRange)
                                      .endAt(endRange)
                                      .orderByChild("payDate"));
            },
            latestTransactions: function(){
                return $firebaseArray(billsRef
                                      .orderByChild("orderDate")
                                      .limitToFirst(5)); // orderDate is the negative payDate
            },
            filteredStatements: function(){
                return $firebaseArray(statementsRef
                                      .startAt(startRange)
                                      .endAt(endRange)
                                      .orderByChild("endDate"));
            },
            latestStatement: function(){
                return $firebaseArray(statementsRef
                                      .orderByChild("endDate")
                                      .limitToLast(1));                

            },
            filteredMaintenance: function(){
                return $firebaseArray(maintenanceRef
                                      .startAt(startRange)
                                      .endAt(endRange)
                                      .orderByChild("dateCreated"));
            },
            allPendingMaintenance: function(){
                return $firebaseArray(maintenanceRef
                                      .orderByChild("approved")
                                      .equalTo("Pending"));
            },
            allOpenMaintenance: function(){
                return $firebaseArray(maintenanceRef
                                      .orderByChild("status")
                                      .equalTo("Open"));
            },
            allClosedMaintenance: function(){
                return $firebaseArray(maintenanceRef
                                      .orderByChild("status")
                                      .equalTo("Closed"));
            }

         };   

        

    
        // Public functions, variables, attributes begin with "Data." because they are part of the Data object that is passed to controllers    
//            Data.beginDateRange = endNegativeRange*-1; // use negative values when filtering by orderDate
//            Data.endDateRange = startNegativeRange*-1; // use negative values when filtering by orderDate
        Data.beginDateRange = startRange;
        Data.endDateRange = endRange;
        Data.globalNumDays = numDays;

        
        
        
 
        /*
        Firebase Query Methods:
        firebaseRef.on(eventType, function(snapshot){}); listens for data changes at a particular location. Use "value", "child_added", "child_changed", "child_removed" or "child_moved" for eventType. Callback function is passed a data snapshot. Return value is the unmodified callback function.
            eventType "value": Triggered once at beginning and again when data changes.
            eventType "child_added": Triggered once for each initial child and again for each new child added.
        
         
        //All PENDING Maintenance Work Orders
        maintenanceRef.orderByChild("approved").equalTo("Pending").on("child_added", function(snapshot) {
                console.log("Open Work Order #",snapshot.val().workOrderNumber, "/ key:",snapshot.key());
            });
            
            */

        

        

        /*
        * ANGULARJS ngClick on any of the date selection buttons
        * takes in a number of days to determine what to change start/end dates to
        * then runs updateUI() to set those dates
        */
        Data.changeDateRange = function(numDays, scope){
            var text;    
            var eleL30D = document.querySelector("#last30Days");
            var eleCY = document.querySelector("#currentYear");
            var eleCD = document.querySelector("#customDates");
            eleL30D.classList.remove("active");
            eleCY.classList.remove("active");
            eleCD.classList.remove("active");
                switch(numDays){
                    case 30: 
                        text = "last 30 days";
                        //endNegativeRange = new Date().getTime();
                        //endNegativeRange = endNegativeRange*-1
//                        startNegativeRange = -1439823680000; // 'current' date is 08/17/2015 11:01:20
//                        endNegativeRange = startNegativeRange - (thirtyDays*-1);//minus 30 days is 7/18/15 11:01:20
                        endRange = 1439823680000; // 'current' date is 08/17/2015 11:01:20
                        startRange = endRange - thirtyDays; // minus 30 days is 7/18/15 11:01:20
                        eleL30D.classList.add("active");
                        break;
                    case 365:
                        text = "current year";
                        //endNegativeRange = new Date().getTime();
                        //endNegativeRange = endNegativeRange*-1
//                        startNegativeRange = -1439823680000; // 'current' date is 08/17/2015 11:01:20
//                        endNegativeRange = -1420088400000; // 'current' year begin 01/01/2015 0:00:00
                        startRange = 1420088400000; // 'current' year begin 01/01/2015 0:00:00
                        endRange = 1439823680000; // 'current' date is 08/17/2015 11:01:20
                        eleCY.classList.add("active");
                        break;
                    case 9999:
                        text = "custom dates"; //For simplicity I've assigned the 'custom' dates
//                        endNegativeRange = -1433131200000; // 06/01/2015
//                        startNegativeRange = -1439697599999; // 'current' date is 08/17/2015 11:01:20
                        startRange = 1433131200000; // custom start date is 6/1/15
                        endRange = 1439697599999; // custom end date is 8/15/15
                        eleCD.classList.add("active");
                        break;
                    default: 
                        console.log("error! changeDateRange() did not receive correct input!");
                        break;
                };
//            Data.beginDateRange = endNegativeRange*-1; // use negative values when filtering by orderDate
//            Data.endDateRange = startNegativeRange*-1; // use negative values when filtering by orderDate
            Data.beginDateRange = startRange;
            Data.endDateRange = endRange;
            Data.globalNumDays = numDays;
            // onDateRangeChangeHandlers initialized as empty array 
            for (var i = 0; i < onDateRangeChangeHandlers.length; i++) {
                onDateRangeChangeHandlers[i]();
            }       
            
         };    


        
       Data.onDateRangeChange = function (handler) {
           onDateRangeChangeHandlers.push(handler);
       };
        
        
        
        
        /* function selectBills() used on the html to filter out bill numbers
        * arguments are all numbers of milliseconds. statementBegin is begin date of statement range, 
        * statementEnd is end date of statement range. billPaydate is date a particular bill was paid
        * function determines if the particular bill pay date occurred within the statement range
        */
        //for overview.html page
        Data.selectBills = function(statementBegin, statementEnd, billPaydate){
            if (statementBegin < billPaydate) {
                if (billPaydate < statementEnd) {
                    return true;
                }
            }
        };
        //for overview.html page
        Data.getOwnerDraw = function(statementBegin, statementEnd, billPaydate, transactionType){
            console.log(transactionType);
            if (transactionType == "Owner Draw"){
                if (statementBegin < billPaydate) {
                    if (billPaydate < statementEnd) {
                        return true;
                    }
                }
            }
        };
        /* function used on Overview.html to only get items from last 30 days
        */
        Data.getLast30Days = function(itemDate){
            if((today-thirtyDays) < itemDate) {
                if (itemDate < today) {
                    return itemDate;
                }
            };
            return;
        };
        //for bills.html to select bills from a specific date range
        // ONLY WORKS WITH ONE PARAMETER INPUT!!!!!!
        Data.showInDateRange = function(billNum){
            if (billNum === undefined) {
                return false;
            } else {
                return true;
            }
        };
        //for bills.html an additional query limit
        Data.trial = function(payDate){
            console.log("payDate", payDate);
//            console.log("startNegativeRange", startNegativeRange);
//            console.log("endNegativeRange", endNegativeRange);
            console.log("startRange", startRange);
            console.log("endRange", endRange);
            return true;
        };
        /* for maintenance.html page. 
        * It takes in the transaction item and return the work order number 
        * if there is one or an empty string if no work order number
        * This is used to prevent errors when showBills() runs on bills without work order numbers
        * <span ng-show="maintenance.Data.showBills( {{item.workOrderNumber}} , maintenance.Data.getWorkOrderNumber(bill) )">{{ bill.billNumber }} {{bill.cost | currency }}</span>
        */
        Data.getWorkOrderNumber = function (bill) {
          return bill.workOrderNumber || "";  
        };
        //for maintenance.html page to get only bills from all transactions of the 'bills' reference
        Data.showBills = function(maintenance_WONum, bill_WONum){
            if (bill_WONum){
                if (bill_WONum == maintenance_WONum) return true;
            } 
        };
        //for maintenance-pending.html template
        Data.decideWorkOrder = function(item, yes_or_no){
            //console.log('CLICK TO APPROVE', item.dateCreated, item.approved, item.description, item.workOrderNumber);
            maintenanceRef.orderByChild("dateCreated").equalTo(item.dateCreated).on("child_added", function(snapshot) {
                //console.log(snapshot.key());
                var curRef = maintenanceRef.child(  snapshot.key() );
                if (yes_or_no == 1) {
                    curRef.update({"approved": "Yes"});
                    curRef.update({"status": "Open"});
                    alert("Work Order #"+item.workOrderNumber+" has been approved. You can now view it on the Maintenance page under Ongoing Work Orders.")
                } else {
                    curRef.update({"approved": "No"});
                    alert("You have REJECTED work order #"+item.workOrderNumber+".");
                }
            });
        };
        

        

                 
        // functions used for the MY ACCOUNT drop-down menus
        var maActive = false;
        Data.followMyAccountLink = function() {
            document.querySelector(".dropdown-content").classList.remove("ma-active");
            maActive = false;
        };
        Data.toggleMyAccountDropdown = function(){
             if (maActive){
                document.querySelector(".dropdown-content").classList.remove("ma-active");
                maActive = false;
             } else {
                 document.querySelector(".dropdown-content").classList.add("ma-active");
                 maActive = true;
             }
         };

        
        /* function setNavLinkStyling() on each state controller
        * sets top navigation link styling on page load
        * paramenter page is a string matching the $state
        * removes the "active" classs from each nav link element and adds "active" to current page
        */
         //sets top navigation link styling on page load
        Data.setNavLinkStyling = function(page){
            document.querySelector("#nav-bills").classList.remove("active");
            document.querySelector("#nav-transactions").classList.remove("active");
            document.querySelector("#nav-maintenance").classList.remove("active");
            document.querySelector("#nav-overview").classList.remove("active");
            document.querySelector("#nav-"+page).classList.add("active");
        };
        
        
        
        return Data; // return the object for this factory service
        

        
        
        
/*************************************************************************************/
    }
    
    angular
        .module('propertyManagement')
        .factory('Data', Data);
})();
// When you’re using a Factory Service you create an object, add properties to it, then return that same object. When you pass this service into your controller, those properties on the object will now be available in that controller through your factory.