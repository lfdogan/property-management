//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. B

        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');    
        var maintenanceRef = rootRef.child('maintenance');



        /* BEGINNING OF DAY DATES!
        * 14200883 = 12/31/2014    
        * 14200884 = 01/01/2015
        * 14227667 = 01/31/2015
        * 14227668 = 02/01/2015
        * 14251859 = 02/28/2015
        * 14251860 = 03/01/2015
        * 14278607 = 03/31/2015
        * 14304527 = 04/30/2015
        * 14304564 = 05/01/2015
        * 14331311 = 05/31/2015
        * 14331348 = 06/01/2015
        * 14357231 = 06/30/2015
        * 14357268 = 07/01/2015
        * 14370228 = 07/16/2015
        * 14384015 = 07/31/2015
        * 14384052 = 08/01/2015
        * 14396975 = 08/15/2015
        * 14397839 = 08/16/2015
        * 14516244 = 01/01/2016
        * new Date().getTime(); = TODAY
        */
        
        //initial values of start and end date range
        var startRange = 14200884 * 100000; // multiply by 100000 for begin of day      
        var endRange = 14396975 * 100000 + 99999; // multiply by 100000 for begin of day then add 99999 for end of day
        var filteredBillsByDateRef;
        var filteredStatementsByDateRef;
        var filteredMaintenanceByDateRef;
        
        var runNewDateFilterReferences = function(){
            filteredBillsByDateRef = billsRef
                .startAt(startRange)
                .endAt(endRange);
            filteredStatementsByDateRef = statementsRef
                .startAt(startRange)
                .endAt(endRange);
            filteredMaintenanceByDateRef = maintenanceRef
                .startAt(startRange)
                .endAt(endRange);
        };
        
        

            //in the controller, this service is renamed allMessages and html ng-repeat calls allMessages        
        var Data = {
            billNumber: function() {//get all bills from database
                return $firebaseArray(billsRef.orderByChild("billNumber")); //order tasks by unique key (also dateAdded)
            },
            filteredBills: function(){
                return $firebaseArray(filteredBillsByDateRef.orderByChild("payDate"));
            },
            statementNumber: function() {
                return $firebaseArray(statementsRef.orderByChild("endDate"));
            },
            filteredStatements: function(){
                return $firebaseArray(filteredStatementsByDateRef.orderByChild("endDate"));
            },
            workOrderNumber: function() {
                return $firebaseArray(maintenanceRef.orderByChild("workOrderNumber"));
            },
            filteredMaintenance: function(){
                return $firebaseArray(filteredMaintenanceByDateRef.orderByChild("dateCreated"));
            }
        };
        
        runNewDateFilterReferences();

        
        var setDatesForHtml = function(){
            Data.beginDateRange = startRange;
            Data.endDateRange = endRange;            
        };

        
        setDatesForHtml();
        
        
        //original text for updating the list but really it didn't actually do anything for my project
        var updateUI = function(){
            runNewDateFilterReferences();
            setDatesForHtml();
            filteredBillsByDateRef.on('value', function(snapshot){
                snapshot.forEach(function(data) {
                     console.log("Key is " + data.key() + " for " + data.val().billNumber);
                 });
            });
            filteredStatementsByDateRef.on('value', function(snapshot){
                snapshot.forEach(function(data) {
                     console.log("Key is " + data.key() + " for " + data.val().endDate);
                 });
            });            
        };

        
        
        /*
        * ANGULARJS ngClick on any of the date selection buttons
        * takes in a number of days to determine what to change start/end dates to
        * then runs updateUI() to set those dates
        */
        Data.changeDateRange = function(numDays){
            var text;
                switch(numDays){
                    case 30: 
                        text = "last 30 days";
                        //endRange = new Date().getTime();
                        endRange = 1439823680000;
                        startRange = endRange - 2592000000;//minus 30 days
                        break;
                    case 365:
                        text = "current year";
                        //endRange = new Date().getTime();
                        endRange = 1439823680000;
                        startRange = 1420088400000; // 01/01/2015
                        //element.setAttribute(class, "active");
                        break;
                    case 1:
                        text = "custom dates";
                        startRange = 14331348 * 100000; // 06/01/2015
                        endRange = 14396975 * 100000 + 99999; // 08/15/2015
                        break;                        
                };
            console.log("change to "+text+" new range: "+startRange+" to "+endRange);
            updateUI();
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