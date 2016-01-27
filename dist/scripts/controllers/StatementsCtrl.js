(function() {
     function StatementsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Statements";

         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;

         this.allStatements = Data.allStatements(); // the ARRAY of objects from the Firebase database
         this.filteredStatements = Data.filteredStatements();
         
         this.allBills = Data.allBills();
         this.filteredBills = Data.filteredBills();         
         
         this.Data = Data;


         //sets navigation link styling on page load
         document.querySelector("#nav-bills").classList.remove("active");
         document.querySelector("#nav-cashflow").classList.remove("active");
         document.querySelector("#nav-maintenance").classList.remove("active");
         document.querySelector("#nav-overview").classList.remove("active");
         document.querySelector("#nav-statements").classList.add("active");
         
         //will update data when user clicks on a date range selection
         var StatementsCtrl = this;
         Data.onDateRangeChange(function () {
            StatementsCtrl.filteredStatements = Data.filteredStatements();
            StatementsCtrl.beginDateRange = Data.beginDateRange; //updates begin date on html after changing selection
            StatementsCtrl.endDateRange = Data.endDateRange;  //updates end date on html after changing selection
         }); 
         


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