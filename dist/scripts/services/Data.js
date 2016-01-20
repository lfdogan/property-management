//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. B





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
        var startRange = 14357268 * 100000; // multiply by 100000 for begin of day      
        var endRange = 14396975 * 100000 + 99999; // multiply by 100000 for begin of day then add 99999 for end of day

        
        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');        
        var filteredBillsByDateRef = billsRef
            .startAt(startRange)
            .endAt(endRange);
        var filteredStatementsByDateRef = statementsRef
            .startAt(startRange)
            .endAt(endRange);        
        


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
            }
        };
        
        

        
        var setDatesForControllers = function(){
            Data.beginDateRange = startRange;
            Data.endDateRange = endRange;            
        };

        
        setDatesForControllers();
        
        
        //original text for updating the list but really it didn't actually do anything for my project
        var tableOfData = document.getElementById('bills-data');
        var updateUI = function(){
            setDatesForControllers();
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

        
        
        //ANGULARJS click
        Data.changeDateRange = function(numDays){
            var text;
                switch(numDays){
                    case 30: 
                        text = "last 30 days";
                        endRange = new Date().getTime();
                        startRange = endRange - 2592000000;//minus 30 days
                        break;
                    case 365:
                        text = "current year";
                        endRange = new Date().getTime();
                        startRange = 1451624400000; // 01/01/2016
                        break;
                    case 1:
                        text = "custom dates";
                        break;                        
                };
            console.log("change to "+text);
            console.log("new range: "+startRange+" to "+endRange);
            updateUI();
         };        
        
        
        var btncurrentYear = document.getElementById('currentYear');
        //HTML DOM addEventListener() Method
        btncurrentYear.addEventListener('click', function(){
            console.log("current Year");
            endRange = new Date().getTime();
            startRange = 1451624400000;//1451624400000 = 01/01/2016, at 00:00:00
            updateUI();
         });
        
        
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

        

        
        
          /******** FOR ADDING NEW DATA ********/
         
//         
//         
//         
//         var billNumber = document.getElementById('billNumber'); 
//         var building = document.getElementById('building'); 
//         var account = document.getElementById('account');
//         var description = document.getElementById('description');
//         var cost = document.getElementById('cost');     
//         
//         var btnBillUpdate = document.getElementById('btnBillUpdate'); //update button for new bill
//    
//         
//         
//
//         
//         //when user clicks on update button... save to firebase:
//         //.set() replaces previous value of 'currentMessage' child with new value from input box
//         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
//         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
//         // Clear out value of input textbox to empty to prepare for next entry     
//         var postID;
//         var newPostRef;
//         btnBillUpdate.addEventListener('click', function(){
//             console.log("UPDATE");
//             newPostRef = billsRef.push();
//             newPostRef.set({
//                 billNumber: billNumber.value, //entered by user
//                 //building: building.value, //entered by user
//                 building: "2165 54th St",
//                 status: "Paid",
//                 account: account.value, //entered by user
//                 description: description.value, //entered by user
//                 cost: cost.value, //entered by user
//                 billDate: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
//             });
//             postID = newPostRef.key();
//             billNumber.value = '';
//             building.value = '';
//             account.value = '';
//             description.value = '';
//             cost.value = '';
//         });
//         
//         
//         
         /******************/
              
        
        return Data;
        

        
        
        
/*************************************************************************************/
    }
    
    angular
        .module('propertyManagement')
        .factory('Data', Data);
})();