//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. B

        //private variables, attributes, functions begin with "var"
        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');    
        var maintenanceRef = rootRef.child('maintenance');


        
        //initial values of start and end date range
        var startNegativeRange = -1439697599999; //negative numbers will order descending but start/end will need to switch
        var endNegativeRange = -1433131200000; //negative 6/1/15
        var numDays = 1;


     


            //in the controller, this service is renamed allMessages and html ng-repeat calls allMessages        
        var Data = {
            billNumber: function() {//get all bills from database
                return $firebaseArray(billsRef
                                      .orderByPriority()); //order tasks by unique key (also dateAdded)
            },
            filteredBills: function(){
                return $firebaseArray(billsRef
                                      .startAt(startNegativeRange)
                                      .endAt(endNegativeRange)
                                      .orderByChild("orderDate"));            
            },
            latestTransactions: function(){
                return $firebaseArray(billsRef
                                      .orderByChild("orderDate")
                                      .limitToFirst(5));    
            },
            statementNumber: function() {
                return $firebaseArray(statementsRef
                                      .orderByChild("endDate"));
            },
            filteredStatements: function(){
                return $firebaseArray(statementsRef
                                      .startAt(startNegativeRange)
                                      .endAt(endNegativeRange)
                                      .orderByChild("endNegative"));
            },
            latestStatement: function(){
                return $firebaseArray(statementsRef
                                      .orderByChild("endDate")
                                      .limitToLast(1));                
            },
            workOrderNumber: function() {
                return $firebaseArray(maintenanceRef
                                      .orderByChild("workOrderNumber"));
            },
            filteredMaintenance: function(){
                return $firebaseArray(maintenanceRef
                                      .startAt(startNegativeRange)
                                      .endAt(endNegativeRange)
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
        

    

        //transform negative values to positive and switch values    
        Data.beginDateRange = endNegativeRange*-1;    
        Data.endDateRange = startNegativeRange*-1;

        
        
 
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

        

        
        // Public functions, variables, attributes begin with "Data."

        Data.globalNumDays = numDays;
        /*
        * ANGULARJS ngClick on any of the date selection buttons
        * takes in a number of days to determine what to change start/end dates to
        * then runs updateUI() to set those dates
        */
        Data.changeDateRange = function(numDays){
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
                        startNegativeRange = -1439823680000; // 'current' date is 08/17/2015 11:01:20
                        endNegativeRange = startNegativeRange - (2592000000*-1);//minus 30 days is 7/18/15 11:01:20
                        eleL30D.classList.add("active");
                        break;
                    case 365:
                        text = "current year";
                        //endNegativeRange = new Date().getTime();
                        //endNegativeRange = endNegativeRange*-1
                        startNegativeRange = -1439823680000; // 'current' date is 08/17/2015 11:01:20
                        endNegativeRange = -1420088400000; // 'current' year begin 01/01/2015 0:00:00
                        eleCY.classList.add("active");
                        break;
                    case 1:
                        text = "custom dates";
                        endNegativeRange = -1433131200000; // 06/01/2015
                        startNegativeRange = -1439697599999; // 'current' date is 08/17/2015 11:01:20
                        eleCD.classList.add("active");
                        break;
                    default: 
                        console.log("error! changeDateRange() did not receive correct input!");
                        break;
                };
            Data.beginDateRange = endNegativeRange*-1;
            Data.endDateRange = startNegativeRange*-1;
            Data.globalNumDays = numDays;
            console.log("NEW value of numDays",numDays);
//            filteredBillsByDateRef.on('value', function(snapshot){
//                snapshot.forEach(function(data) {
//                     console.log("Key is " + data.key() + " for " + data.val().billNumber);
//                 });
//            });
//
//            filteredStatementsByDateRef.on('value', function(snapshot){
//                snapshot.forEach(function(data) {
//                     console.log("Key is " + data.key() + " for " + data.val().endDate);
//                 });
//            });
         };    


        
       
        
        
        
        
        /* function selectBills() used on the html to filter out bill numbers
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
        
        Data.showBills = function(maintenance, bill){
            //console.log("maintenance", maintenance);
            //console.log("bill", bill);
            if (bill){
                if (bill == maintenance) return true;
            } 
        };

        

        /* function checkOff()
        * @desc user clicks on a task and function marks task as complete (completed: true)
        * first console.log prints the information for the task that was clicked on
        * using startAt(), endAt(), and equalTo() allows us to choose arbitrary starting and ending points for our queries
        * in our database, query all children whose dateAdded is equal to task.dateAdded
        * print the unique ID (key)
        * create a new reference to that specific task
        * update the value of completed... i.e. change it from 'false' to 'true'
        * print new value of completed
        * this does NOT update the checkmark in the ALL TASKS view!!!
        */
        Data.decideWorkOrder = function(item, yn){
            //console.log('CLICK TO APPROVE', item.dateCreated, item.approved, item.description, item.workOrderNumber);
            maintenanceRef.orderByChild("dateCreated").equalTo(item.dateCreated).on("child_added", function(snapshot) {
                //console.log(snapshot.key());
                var curRef = maintenanceRef.child(  snapshot.key() );
                if (yn == 1) {
                    curRef.update({"approved": "Yes"});
                    curRef.update({"status": "Open"});
                    alert("Work Order #"+item.workOrderNumber+" has been approved. You can now view it on the Maintenance page under Ongoing Work Orders.")
                } else {
                    curRef.update({"approved": "No"});
                    alert("You have REJECTED work order #"+item.workOrderNumber+".");
                }
            });
        };
        
        
        

        console.log("Running Data.js... inital value of numDays",numDays);
        
        return Data;
        

        
        
        
/*************************************************************************************/
    }
    
    angular
        .module('propertyManagement')
        .factory('Data', Data);
})();