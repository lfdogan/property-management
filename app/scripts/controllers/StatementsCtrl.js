 (function() {
     function StatementsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Statements";

         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;

         this.allStatements = Data.statementNumber(); // the ARRAY of objects from the Firebase database
         this.filteredStatements = Data.filteredStatements();
         
         this.allBills = Data.billNumber();
         this.filteredBills = Data.filteredBills();         
         
         this.Data = Data;




         
         
 /******** FOR ADDING NEW DATA ********/
//         
//         
//         
//         
//         var beginDate = document.getElementById('beginDate'); 
//         var endDate = document.getElementById('endDate');   
//         
//         var btnStatementsUpdate = document.getElementById('btnStatementsUpdate'); //update button for new bill
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
//         btnStatementsUpdate.addEventListener('click', function(){
//             console.log("UPDATE");
//             newPostRef = statementsRef.push();
//             newPostRef.set({
//                 beginDate: beginDate.value, //entered by user
//                 endDate: endDate.value, //entered by user
//                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
//             });
//             postID = newPostRef.key();
//             beginDate.value = Number(endDate.value)+1;
//             endDate.value = '';
//         });
//         
//         
//         
         /******************/         
         
         
         
         
         
         


         

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