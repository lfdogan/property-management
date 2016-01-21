//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. B

        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');    
        var maintenanceRef = rootRef.child('maintenance');


        
        //initial values of start and end date range
        var startRange = 14331348 * 100000;
        var endRange = 14396975 * 100000 + 99999;
        var setHtmlDates = function(){            
            Data.beginDateRange = startRange;
            Data.endDateRange = endRange;    
        };

     


            //in the controller, this service is renamed allMessages and html ng-repeat calls allMessages        
        var Data = {
            billNumber: function() {//get all bills from database
                return $firebaseArray(billsRef
                                      .orderByChild("billNumber")); //order tasks by unique key (also dateAdded)
            },
            filteredBills: function(){
                return $firebaseArray(billsRef
                                      .startAt(startRange)
                                      .endAt(endRange)
                                      .orderByChild("payDate"));            
            },
            latestTransactions: function(){
                return $firebaseArray(billsRef
                                      .orderByChild("payDate")
                                      .limitToLast(5));    
            },
            statementNumber: function() {
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
            workOrderNumber: function() {
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
            }
        };
        

        setHtmlDates();
        
        /*
        console.log("All PENDING Maintenance Work Orders:");
        maintenanceRef.orderByChild("approved").equalTo("Pending").on("child_added", function(snapshot) {
                console.log(snapshot.key());
            });
        
        console.log("All Open Maintenance Work Orders:");
        maintenanceRef.orderByChild("status").equalTo("Open").on("child_added", function(snapshot) {
                console.log(snapshot.key());
            });

        // lists all statements ordered by endDate from oldest to newest
        statementsRef.orderByChild("endDate").on("child_added", function(snapshot) {
            console.log(snapshot.key() + " is " + snapshot.val().endDate);
            });
        
        // lists the newest statement
        statementsRef.orderByChild("endDate").limitToLast(1).on("child_added", function(snapshot) {
                console.log(snapshot.key(), snapshot.val().endDate);
            });
            
            */

        


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
                        //endRange = new Date().getTime();
                        endRange = 1439823680000;
                        startRange = endRange - 2592000000;//minus 30 days
                        eleL30D.classList.add("active");
                        break;
                    case 365:
                        text = "current year";
                        //endRange = new Date().getTime();
                        endRange = 1439823680000;
                        startRange = 1420088400000; // 01/01/2015
                        eleCY.classList.add("active");
                        break;
                    case 1:
                        text = "custom dates";
                        startRange = 14331348 * 100000; // 06/01/2015
                        endRange = 14396975 * 100000 + 99999; // 08/15/2015
                        eleCD.classList.add("active");
                        break;
                    default: 
                        console.log("error!");
                        break;
                };
        //original text for updating the list but really it didn't actually do anything for my project
            setHtmlDates();
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

        

        

              
        
        return Data;
        

        
        
        
/*************************************************************************************/
    }
    
    angular
        .module('propertyManagement')
        .factory('Data', Data);
})();