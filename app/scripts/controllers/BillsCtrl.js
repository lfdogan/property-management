(function() {
     function BillsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Bills";

         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.allBills = Data.allBills();
         this.filteredBills = Data.filteredBills();


         this.allStatements = Data.allStatements(); // the ARRAY of objects from the Firebase database


         //sets navigation link styling on page load
         document.querySelector("#nav-bills").classList.add("active");
         document.querySelector("#nav-cashflow").classList.remove("active");
         document.querySelector("#nav-maintenance").classList.remove("active");
         document.querySelector("#nav-overview").classList.remove("active");
         document.querySelector("#nav-statements").classList.remove("active");
         
         
         //will update data when user clicks on a date range selection
         var BillsCtrl = this;
         Data.onDateRangeChange(function () {
            BillsCtrl.filteredBills = Data.filteredBills();
            BillsCtrl.beginDateRange = Data.beginDateRange; //updates begin date on html after changing selection
            BillsCtrl.endDateRange = Data.endDateRange;  //updates end date on html after changing selection
         }); 
       
     
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