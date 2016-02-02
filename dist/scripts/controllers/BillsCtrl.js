(function() {
     function BillsCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Repair History";

         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         this.setRange = Data.globalNumDays;
         this.setColumnSort = Data.globalcolumnToSortBy;
         
         this.allBills = Data.allBills();
         this.filteredBills = Data.filteredBills();

         this.allStatements = Data.allStatements(); // the ARRAY of objects from the Firebase database

         //hides My Account dropdown menu on page load
         Data.followMyAccountLink();

         //sets top navigation link styling on page load
         Data.setNavLinkStyling("bills");
         
         //used in bill.html to show data only for selected billNumber 
         this.getSingleBill = function(billnum, item){
             if (billnum == item.billNumber) return true;
         };
         


         
         
         //will update data when user clicks on a date range selection
         var BillsCtrl = this;
         Data.onTableViewChange(function () {
             console.log("run BillsCtrl.onTableViewChange()");
             BillsCtrl.filteredBills = Data.filteredBills();
             BillsCtrl.beginDateRange = Data.beginDateRange; //updates begin date on html after changing selection
             BillsCtrl.endDateRange = Data.endDateRange;  //updates end date on html after changing selection
             BillsCtrl.setRange = Data.globalNumDays;
             BillsCtrl.setColumnSort = Data.globalcolumnToSortBy;
         } );

         
         /* new variables setColumnSort and reverse are used to sort table data by column
         * setColumnSort gets information from Data.js inital value is 'payDate'
         * reverse will sort descending for reverse=true, ascending for reverse=false
         * function order() checks if user clicks on same column heading: if true reverse will switch order
         * if false user clicked on different column so set order to descending
         */
         this.setColumnSort = Data.globalcolumnToSortBy;
         this.reverse = true;
         this.order = function(setColumnSort) {
             if (this.setColumnSort === setColumnSort) { 
                     this.reverse = !this.reverse;
                 } else this.reverse = true;
             this.setColumnSort = setColumnSort;
         };

     
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