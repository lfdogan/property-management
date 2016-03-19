(function() {
     function CashFlowCtrl(Data) { //services injected
         

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Transactions";

         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.allBills = Data.allBills();
         this.filteredBills = Data.filteredBills();

         this.allStatements = Data.allStatements(); // the ARRAY of objects from the Firebase database
         

         Data.followMyAccountLink();

         //sets top navigation link styling on page load
         Data.setNavLinkStyling("transactions");
         
         

         
         
         //will update data when user clicks on a date range selection
         var CashFlowCtrl = this;
         Data.onTableViewChange(function () {
             //console.log("run CashFlowCtrl.onTableViewChange()");
             CashFlowCtrl.filteredBills = Data.filteredBills();
             CashFlowCtrl.beginDateRange = Data.beginDateRange; //updates begin date on html after changing selection
             CashFlowCtrl.endDateRange = Data.endDateRange;  //updates end date on html after changing selection
             CashFlowCtrl.setRange = Data.globalNumDays;
             CashFlowCtrl.setColumnSort = Data.globalcolumnToSortBy;
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
         

         this.getSum = function(transType){
             var sum = 0;
             for (var i=0; i < this.filteredBills.length; i++ ){
                 var transaction = this.filteredBills[i];
                 if (transType == 'I'){
                     if (transaction.account >= '4000' && transaction.account < '5000') {
                         sum = sum + transaction.amountPaid;
//                         console.log("current income sum:",sum);
                     }
                 }
                 if (transType == 'E'){
                     if (transaction.account >= '5000') {
                         sum = sum + transaction.amountPaid;
                         //console.log("current income sum:",sum);
                     }
                 }
                 if (transType == 'P'){
                     if (transaction.account <= '2000') {
                         sum = sum + transaction.amountPaid;
                         //console.log("current income sum:",sum);
                     }
                 }
             }
//             console.log("total:", sum);
             return sum;
         };
         
         

         
         /************************** FOR ADDING NEW DATA **************************/
         /*
         var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
         var billsRef = rootRef.child('bills');
         var statementsRef = rootRef.child('statements');    
         var maintenanceRef = rootRef.child('maintenance');
        
         this.accountLabels = Data.accountLabels();
         this.allTenants = Data.allTenants();
         this.myBuildings = Data.myBuildings();
         
         var account = document.getElementById('account'); 
         var amountPaid = document.getElementById('amountPaid');
         var billDate = document.getElementById('billDate');
         var billNumber = document.getElementById('billNumber');
         //var transactionType = document.getElementById('transactionType');
         var building = document.getElementById('building');
         var cost = document.getElementById('cost');
         var description = document.getElementById('description');
         var date_month_dueDate = document.getElementById('date_month_dueDate');
         var date_day_dueDate = document.getElementById('date_day_dueDate');
         var date_year_dueDate = document.getElementById('date_year_dueDate');
         var payDate = document.getElementById('payDate');
         var portfolio = document.getElementById('portfolio');
         var referenceNum = document.getElementById('referenceNum');
         var status = document.getElementById('status');
         var vendor = document.getElementById('vendor');
         var workOrderNumber = document.getElementById('workOrderNumber');
         var btnNewItemUpdate = document.getElementById('btnNewItemUpdate'); //update button for new bill
         var btnNewOwnerDraw = document.getElementById('btnNewOwnerDraw'); //update button for new owner draw
         var btnNewIncome = document.getElementById('btnNewIncome'); //add button for new income (rent, utilities, etc.)
         
    
         
         
         //when user clicks on update button... save to firebase:
         //.set() replaces previous value of 'currentMessage' child with new value from input box
         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
         // Clear out value of input textbox to empty to prepare for next entry     
         var postID;
         var newPostRef;
         btnNewItemUpdate.addEventListener('click', function(){
             console.log("New Bill");
             var dueDate = new Date(date_month_dueDate.value +" "+ date_day_dueDate.value +" "+ date_year_dueDate.value +" 12:00:00:000");
             newPostRef = billsRef.push();
             //newPostRef = maintenanceRef.push();
             //newPostRef = statementsRef.push();
             newPostRef.set({//entered by user
                 account: Number(account.value), 
                 amountPaid: Number(amountPaid.value),
                 billDate: Number(billDate.value),
                 billNumber: Number(billNumber.value),
                 //transactionType: transactionType.value,
                 building: building.value,
                 cost: Number(cost.value),
                 description: description.value,
                 dueDate: dueDate.getTime(),//calculate ms from text date
                 payDate: Number(payDate.value),
                 status: status.value, //Paid or Unpaid
                 vendor: vendor.value,
                 workOrderNumber: Number(workOrderNumber.value),
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
         });
         btnNewOwnerDraw.addEventListener('click', function(){
             console.log("Add new Owner Draw");
             newPostRef = billsRef.push();
             newPostRef.set({//entered by user
                 account: Number(account.value), // "Owner Draw" is 1000
                 amountPaid: Number(amountPaid.value),
                 description: description.value,
                 dueDate: Number(dueDate.value),
                 payDate: Number(payDate.value),
                 portfolio: portfolio.value, //for owner draw only
                 referenceNum: referenceNum.value, //for owner draw only
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
         });
         btnNewIncome.addEventListener('click', function(){
             console.log("New Income");
             newPostRef = billsRef.push();
             //newPostRef = maintenanceRef.push();
             //newPostRef = statementsRef.push();
             newPostRef.set({//entered by user
                 account: Number(account.value), 
                 amountPaid: Number(amountPaid.value),
                 building: building.value,
                 description: description.value,
                 dueDate: Number(dueDate.value),
                 payDate: Number(payDate.value),
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
         });
         /* ************************************************************* */
         
         
         
         
       
     }
 
     angular
         .module('propertyManagement')
         .controller('CashFlowCtrl', ['Data', CashFlowCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();