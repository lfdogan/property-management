(function() {
     function StatementsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;

         this.allStatements = Data.allStatements(); // the ARRAY of objects from the Firebase database
         this.filteredStatements = Data.filteredStatements();
         
         this.allBills = Data.allBills();
         this.filteredBills = Data.filteredBills();
         
         this.inspections_two = Data.inspections_two();
         this.allInspections = Data.allInspections();
         
         this.Data = Data;
         
         Data.followMyAccountLink();


         //sets top navigation link styling on page load
         Data.setNavLinkStyling("documents");
         
         //will update data when user clicks on a date range selection
         var StatementsCtrl = this;
         Data.onTableViewChange(function () {
             //console.log("run StatementsCtrl.onTableViewChange()");
             StatementsCtrl.filteredStatements = Data.filteredStatements();
             StatementsCtrl.beginDateRange = Data.beginDateRange; //updates begin date on html after changing selection
             StatementsCtrl.endDateRange = Data.endDateRange;  //updates end date on html after changing selection
             StatementsCtrl.setRange = Data.globalNumDays;
             StatementsCtrl.setColumnSort = Data.globalcolumnToSortBy;
         } );
         
         var tenants = document.getElementById("former-tenants-table");
         tenants.style.display = "none";
         var inspection = document.getElementById("inspection-reports-table");
         inspection.style.display = "none";
        
         this.show_hide = function(id){
             var toggle = document.getElementById(id);
             console.log("toggle", id);
             if (toggle.style.display == "table"){
                 toggle.style.display = "none";
             } else toggle.style.display = "table";
         };



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