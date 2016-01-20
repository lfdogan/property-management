//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Data($firebaseArray) {//Inject dependencies and the additional services into the this service. B

        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        var statementsRef = rootRef.child('statements');



        /* BEGINNING OF DAY DATES!
        * 1420088400000 = 01/01/2015 at 00:00:00
        * 1422766800000 = 02/01/2015
        * 1425186000000 = 03/01/2015
        * 1430456400000 = 05/01/2015
        * 1433134800000 = 06/01/2015
        * 1435726800000 = 07/01/2015
        * 1438405200000 = 08/01/2015
        * 1451624400000 = 01/01/2016
        */
        var billStartRange = 1438405200000;
        
        /* END OF DAY DATES!
        * 1420088399999 = 12/31/2014 at 23:59:59
        * 1422766799999 = 01/31/2015
        * 1425185999999 = 02/28/2015
        * 1427777999999 = 03/31/2015
        * 1430369999999 = 04/30/2015
        * 1433048399999 = 05/31/2015
        * 1435640399999 = 06/30/2015
        * 1438318799999 = 07/31/2015
        * 1439614799999 = 08/15/2015
        * new Date().getTime(); = TODAY
        */        
        var billEndRange = 1439614799999;
        
        var filteredBillsByDateRef = billsRef
            .startAt(billStartRange)
            .endAt(billEndRange);
        
        

        
        
        
        
            //get all bills from database
            //'all' is ordered by default (index)
            //in the controller Messages is renamed allMessages and html ng-repeat calls allMessages        
        var Data = {
            billNumber: function() {
                return $firebaseArray(billsRef.orderByChild("billNumber")); //order tasks by unique key (also dateAdded)
            },
            filteredBills: function(){
                return $firebaseArray(filteredBillsByDateRef.orderByChild("payDate"));
            },
            statementNumber: function() {
                return $firebaseArray(statementsRef.orderByChild("endDate"));
            }
        };
        
        

        
        
        Data.beginDate = billStartRange;
        Data.endDate = billEndRange;
        
        
        
        
        //original text for updating the list but really it didn't actually do anything for my project
        var tableOfData = document.getElementById('bills-data');
        var updateUI = function(){
            Data.beginDate = billStartRange;
            Data.endDate = billEndRange;            
            filteredBillsByDateRef.on('value', function(snapshot){
                snapshot.forEach(function(data) {
                     console.log("Key is " + data.key() + " for " + data.val().billNumber);
                 });
            });
        };

        
        var btnlast30Days = document.getElementById('last30Days');
        //HTML DOM addEventListener() Method
//        btnlast30Days.addEventListener('click', function(){
//            console.log("change to last 30 days");
//            console.log("previous range: "+billStartRange+" to "+billEndRange);
//            billEndRange = new Date().getTime();
//            billStartRange = billEndRange - 2592000000;//minus 30 days
//            console.log("new range: "+billStartRange+" to "+billEndRange);
//            btnlast30Days.style.backgroundColor = "red";
//            updateUI();
//         });
        
        //ANGULARJS click
        Data.changeDateRange = function(numDays){
            console.log("previous range: "+billStartRange+" to "+billEndRange);
            var text;
                switch(numDays){
                    case 30: 
                        text = "last 30 days";
                        billEndRange = new Date().getTime();
                        billStartRange = billEndRange - 2592000000;//minus 30 days
                        break;
                    case 365:
                        text = "current year";
                        billEndRange = new Date().getTime();
                        billStartRange = 1451624400000; // 01/01/2016
                        break;
                    case 1:
                        text = "custom dates";
                        break;                        
                };
            console.log("change to "+text);
            console.log("new range: "+billStartRange+" to "+billEndRange);
            updateUI();
         };        
        
        
        var btncurrentYear = document.getElementById('currentYear');
        //HTML DOM addEventListener() Method
        btncurrentYear.addEventListener('click', function(){
            console.log("current Year");
            billEndRange = new Date().getTime();
            billStartRange = 1451624400000;//1451624400000 = 01/01/2016, at 00:00:00
         });
        
        
        

        

        
        
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