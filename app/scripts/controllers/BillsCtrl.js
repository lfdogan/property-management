 (function() {
     function BillsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Bills";
         this.allBills = Data.billNumber(); // the ARRAY of objects from the Firebase database
         //this.Data = Data; // allows html to access functions in Data service

         

         
         
         
         
       
     }
 
     angular
         .module('propertyManagement')
         .controller('BillsCtrl', ['Data', BillsCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();

/* 1/12/16 when moving functions out of BillsCtrl.js into Message.js you must have:
function BillsCtrl(Bills)
this.Bills = Bills;
.controller('BillsCtrl', ['Bills', BillsCtrl]);
along with the correct path in the html ( {{ bills.Bills.labelPriority(bills.priority) }} )
*/