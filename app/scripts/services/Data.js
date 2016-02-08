//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. 


        
        
        
        //private variables, attributes, functions begin with "var"
        
        
        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');    
        var maintenanceRef = rootRef.child('maintenance');
        var buildingsRef = rootRef.child('buildings');
        var portfoliosRef = rootRef.child('portfolios');
        var inspectionsRef = rootRef.child('inspections');


        //initial values of start and end date range
        var startRange = 1433131200000; // custom start date is 6/1/15
        var endRange = 1439697599999; // custom end date is 8/15/15
        var today = 1439823680000; // 'current' date is 08/17/2015 11:01:20
        var thirtyDays = 1000 * 60 * 60 * 24 * 30;// 1000ms/sec * 60sec/min * 60min/hr * 24hr/day * 30days
        var numDays = 30; // used for switching date selection range
        var columnToSortBy = "payDate"; //used for switching which column of table data to order

        // array used for changeDateRange()
        var onTableViewChangeHandlers = [];

     
// for a factory service: create an object, add properties to it, then return that same object. 
        //var Data = $firebaseArray.$extend({// these methods exist on the prototype, so we can access the data using `this`
      
        var Data = {
            //Bills / Cash Flow / Transactions References
            allBills: function() {//get all bills from database, order by bill number (also date created) 
                return $firebaseArray(billsRef
                                      .orderByChild("billNumber"));
            },
            billsOwnerDraw: function() {//for the overview & contributions pages, selects only transactions that are owner draw/contribution
                return $firebaseArray(billsRef
                                      .startAt(1000)
                                      .endAt(1050)
                                      .orderByChild("account"));
            },
            billsRentIncome: function() {//for the overview page, selects only transactions that are rent income
                return $firebaseArray(billsRef
                                     .orderByChild("account")
                                     .equalTo(4000));
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
            
            //Statements References
            allStatements: function() {
                return $firebaseArray(statementsRef
                                      .orderByChild("endDate"));
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
            inspections_two: function() {
                    return $firebaseArray(inspectionsRef
                                      .orderByChild("inspectionDate")
                                      .limitToLast(2));
            },
            allInspections: function() {
                return $firebaseArray(inspectionsRef);
            },
            
            //Maintenance / Work Order References
            allMaintenance: function() {
                return $firebaseArray(maintenanceRef
                                      .orderByChild("workOrderNumber"));
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
            },
            myPortfolio: function(){
                return $firebaseArray(portfoliosRef);
            },
            myBuildings: function(){
                return $firebaseArray(buildingsRef);
            }

         };   

        

    
        // Public functions, variables, attributes begin with "Data." because they are part of the Data object that is passed to controllers
        Data.beginDateRange = startRange;
        Data.endDateRange = endRange;
        Data.globalNumDays = numDays;
        Data.globalcolumnToSortBy = columnToSortBy;

        
        
        
 
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
        * ANGULARJS ngClick on any of the date selection buttons (ORIGINAL VERSION)
        * ANGULARJS ngChange on any of the date select options
        * passed in a number of days to determine what to change start/end dates to
        * removes 'active' class from all <div> for original version
        * removes 'selected' attribute from all for option version
        * sets begin/end dates based on numDays and passes those to global variables
        * sets the selected <div>/<option> to 'active'/'selected' to display on page as current data view
        * inital load parameters are inital value of numDays and scope
        */
//        Data.changeDateRange = function(numDays, scope){//scope not needed since SelectDateRangeCtrl function not run!
        Data.changeDateRange = function(numDays){
            console.log("running Data.changeDateRange(",numDays,")");
            var text;
            var element;
             //for original selection bar version
//            document.querySelector("#last30Days").classList.remove("active");
//            document.querySelector("#currentYear").classList.remove("active");
//            document.querySelector("#customDates").classList.remove("active");
             //for <option>'s <select> element
            document.querySelector("#last30Days").removeAttribute("selected");
            document.querySelector("#currentYear").removeAttribute("selected");
            document.querySelector("#customDates").removeAttribute("selected");
                switch(Number(numDays)){
                    case 30: 
                        text = "last 30 days";
                        element = document.querySelector("#last30Days");
                        endRange = today;
                        //endRange = new Date().getTime();
                        startRange = endRange - thirtyDays; // minus 30 days is 7/18/15 11:01:20
                        break;
                    case 365:
                        text = "current year";
                        element = document.querySelector("#currentYear");
                        startRange = 1420088400000; // 'current' year begin 01/01/2015 0:00:00
                        endRange = today;
                        //endRange = new Date().getTime();
                        break;
                    case 1418750767907:
                        startRange = 1418750767907;
                        endRange = 1421342767907;
                        text = "12/16/2014-1/15/15";
                        break;
                    case 1421342767908:
                        text = "1/15/15-2/13/15";
                        startRange = 1421342767908;
                        endRange = 1423852608970;
                        break;
                    case 1423852608971:
                        startRange = 1423852608971;
                        endRange = 1426252608970;
                        text = "2/13/15-3/13/15";
                        break;
                    case 1426252608971:
                        startRange = 1426252608971;
                        endRange = 1429131508997;
                        text = "3/13/15-4/15/15";
                        break;
                    case 1429131508998:
                        startRange = 1429131508998;
                        endRange = 1431710767907;
                        text = "4/15/15-5/15/15";
                        break;
                    case 1431710767908:
                        startRange = 1431710767908;
                        endRange = 1434389167907;
                        text = "5/15/15-6/15/15";
                        break;
                    case 1434389167908:
                        startRange = 1434389167908;
                        endRange = 1436981167907;
                        text = "6/15/15-7/15/15";
                        break;
                    case 1436981167908:
                        startRange = 1436981167908;
                        endRange = 1439560250008;
                        text = "7/15/15-8/14/15";
                        break;
                    case 9999:
                        text = "8/14/15-today"; //For simplicity I've assigned the 'custom' dates
                        element = document.querySelector("#customDates");
                        startRange = 1439560250009; // 1 ms after last range
                        endRange = today;
                        break;
                    default: 
                        console.log("error! Data.changeDateRange() did not receive correct 'numDays' input!");
                        break;
                };
//            element.classList.add("active"); //for original selection bar version
//            element.setAttribute("selected","selected"); //for <option>'s <select> element
            Data.beginDateRange = startRange;
            Data.endDateRange = endRange;
            Data.globalNumDays = numDays;
            // onDateRangeChangeHandlers initialized as empty array
            for (var i = 0; i < onTableViewChangeHandlers.length; i++) {
                onTableViewChangeHandlers[i]();
            }
            //console.log("End Data.changeDateRange()", startRange, endRange, numDays);
         };
        /* function passes 'handler' which is a function from the page controller's function 'onDateRangeChange()'
        * it pushes 'handler' to 0 index of 'onTableViewChangeHandlers' array
        */
        Data.onTableViewChange = function (handler) {
           onTableViewChangeHandlers.push(handler);
           //console.log("run Data.onTableViewChange()");
        };
        
        
        
        
        /* for overview.html page
        * function selectBills() used on the html to filter out bill numbers
        * arguments are all numbers of milliseconds. statementBegin is begin date of statement range, 
        * statementEnd is end date of statement range. billPaydate is date a particular bill was paid
        * function determines if the particular bill pay date occurred within the statement range
        */
        Data.selectBills = function(statementBegin, statementEnd, billPaydate){
            if (statementBegin < billPaydate) {
                if (billPaydate < statementEnd) {
                    return true;
                }
            }
        };
        //for overview.html page... currently commented because it was in statements section and was trial
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
        * <div ng-repeat="item in overview.billsRentIncome"  ng-show="overview.Data.getLast30Days( {{ item.payDate }} )">
        * <div ng-repeat="item in overview.billsOwnerDraw"  ng-show="overview.Data.getLast30Days( {{ item.payDate }} )">
        * searches the array of only rental incomed and array of only owner draws 
        * for all transactions that were in last 30 days
        * parameter is the array element's payDate
        * calculates the date/time of 30 days ago and checks if it is less than the payDate
        * if true then it checks to see if payDate is less than today
        * if both true it returns the item payDate or else returns nothing
        */
        Data.getLast30Days = function(itemPayDate){
            if((today-thirtyDays) < itemPayDate) {
                if (itemPayDate < today) {
                    return itemPayDate;
                }
            };
            return;
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
        /* input parameters are the array item element and true (approve) or false (reject)
        * creates a new maintenance array of all work orders with the dateCreated equal to the current work order
        * and if user clicked the approve button (true) it will add to that array element 'approved=yes' and 'status=open'
        * it will alert user of change.
        * if user clicked the reject (false) button it will add to that array element 'approved=no' and
        * alert user of change.
        */
        Data.decideWorkOrder = function(item, true_or_false){
            //console.log('CLICK TO APPROVE', item.dateCreated, item.approved, item.description, item.workOrderNumber);
            maintenanceRef.orderByChild("dateCreated").equalTo(item.dateCreated).on("child_added", function(snapshot) {
                //console.log(snapshot.key());
                var curRef = maintenanceRef.child(  snapshot.key() );
                if (true_or_false) {
                    curRef.update({"approved": "Yes"});
                    curRef.update({"status": "Open"});
                    curRef.update({"dateStarted": today}); // 'current' date is 08/17/2015 11:01:20});
                    alert("Work Order #"+item.workOrderNumber+" has been approved. You can now view it on the Maintenance page under Ongoing Work Orders.")
                } else {
                    curRef.update({"approved": "No"});
                    curRef.update({"status": "Closed"});
                    alert("You have REJECTED work order #"+item.workOrderNumber+".");
                }
            });
        };
        

        

                 
        /* functions used for the MY ACCOUNT drop-down menus. 
        * followMyAccountLink() function called on each page controller
        * selects the dropdown element and removes the 'ma-active' class so that it disappears and
        * it sets private variable 'maActive' to false
        * toggleMyAccountDropdown() function called on index.html page when user clicks on 'My Account' or hamburger
        * when private variable 'maActive' is true it does same as followMyAccountLink() to close dropdown
        * when 'maActive' is false it will add the 'ma-active' class to open menu and set 'maActive' variable to true
        */
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