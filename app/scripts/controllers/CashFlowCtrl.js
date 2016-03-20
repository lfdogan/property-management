(function() {
     function CashFlowCtrl(Data) { //services injected
         

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Transactions";

         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.filteredBills = Data.filteredBills();

         Data.followMyAccountLink();

         //sets top navigation link styling on page load
         Data.setNavLinkStyling("transactions");
                  
         //used for adding new transaction
         this.myBuildings = Data.myBuildings();
         this.accountLabels = Data.accountLabels();
         this.allApplicants = Data.allApplicants();
         this.allMaintenance = Data.allMaintenance();
         this.months = Data.months;

         
         
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
         var billsRef = new Firebase("https://property-management-lfdogan.firebaseio.com/bills");
        
         var account = document.getElementById('account'); 
         var amountPaid = document.getElementById('amountPaid');
         var billNumber = document.getElementById('billNumber');
         var building = document.getElementById('building');
         var cost = document.getElementById('cost');
         var description = document.getElementById('description');
         var paidByTenantID = document.getElementById('paidByTenantID');
         var portfolio = document.getElementById('portfolio');
         var referenceNum = document.getElementById('referenceNum');
         var status = document.getElementById('status');
         var vendor = document.getElementById('vendor');
         var workOrderNumber = document.getElementById('workOrderNumber');
         
         
         //var billDate = document.getElementById('billDate');
         var BDmonth = document.getElementById('BDmonth');
         var BDday = document.getElementById('BDday');
         var BDyear = document.getElementById('BDyear');
         var BDhours = document.getElementById('BDhours');
         var BDminutes = document.getElementById('BDminutes');
         //dueDate
         var DDmonth = document.getElementById('DDmonth');
         var DDday = document.getElementById('DDday');
         var DDyear = document.getElementById('DDyear');
         //var payDate = document.getElementById('payDate');
         var PDmonth = document.getElementById('PDmonth');
         var PDday = document.getElementById('PDday');
         var PDyear = document.getElementById('PDyear');
         var PDhours = document.getElementById('PDhours');
         var PDminutes = document.getElementById('PDminutes');
         
         var btnNewBillUpdate = document.getElementById('btnNewBillUpdate'); //update button for new bill
         var btnNewOwnerDraw = document.getElementById('btnNewOwnerDraw'); //update button for new owner draw
         var btnNewIncome = document.getElementById('btnNewIncome'); //add button for new income (rent, utilities, etc.)
    
         var applicantsRef = new Firebase('https://property-management-lfdogan.firebaseio.com/applicants');
         var applicants = [];
         applicantsRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {//cycle through all applicants
                var key = childSnapshot.key();
                var childData = childSnapshot.val();
                var person = {'name': childData.applicantName, 'applicantID': key};
                applicants.push(person);
            });
         });
                        
         
         //when user clicks on update button... save to firebase:
         //.set() replaces previous value of 'currentMessage' child with new value from input box
         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
         // Clear out value of input textbox to empty to prepare for next entry     
         var postID;
         var newPostRef;
         //Add new bill
         btnNewBillUpdate.addEventListener('click', function(){
             console.log("New Bill");
             var dueDate = new Date(DDmonth.value +" "+ DDday.value +" "+ DDyear.value +" 23:59:59:999");
             var billDate = new Date(BDmonth.value +" "+ BDday.value +" "+ BDyear.value +" "+BDhours.value+":"+BDminutes.value+":00:001");
             var payDate = new Date(PDmonth.value +" "+ PDday.value +" "+ PDyear.value +" "+PDhours.value+":"+PDminutes.value+":00:001");
             newPostRef = billsRef.push();
             newPostRef.set({//entered by user
                 account: Number(account.value), 
                 amountPaid: Number(amountPaid.value),
                 billNumber: Number(billNumber.value),
                 building: building.value,
                 cost: Number(cost.value),
                 status: status.value, //Paid or Unpaid
                 billDate: Number(billDate),
                 dueDate: Number(dueDate),
                 payDate: Number(payDate),
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
             var postIDRef = billsRef.child(postID);//assign the postIDRef to the new child
             //if user entered data, add to the database
             if (description.value != "") postID.update({'description': description.value});
             if (workOrderNumber.value != "") postID.update({'workOrderNumber': Number(workOrderNumber.value)});
             if (vendor.value != "") postID.update({'vendor': vendor.value});
         });
         //Add new Owner Draw
         btnNewOwnerDraw.addEventListener('click', function(){
             console.log("Add new Owner Draw");
             newPostRef = billsRef.push();
             newPostRef.set({//entered by user
                 account: Number(account.value), // "Owner Draw" is 1000
                 amountPaid: Number(amountPaid.value),
                 description: "Owner Draw "+Data.mdyy(payDate),
                 payDate: Number(payDate),
                 portfolio: portfolio.value, //for owner draw only
                 referenceNum: referenceNum.value, //for owner draw only
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
             var postIDRef = billsRef.child(postID);//assign the postIDRef to the new child
             //if user entered data, add to the database
             if (description.value != "") postID.update({'description': "Owner Draw "+Data.mdyy(payDate)+" "+description.value});
         });
         //Add new income
         btnNewIncome.addEventListener('click', function(){
             var dueDate = new Date(DDmonth.value +" "+ DDday.value +" "+ DDyear.value +" 23:59:59:999");
             var payDate = new Date(PDmonth.value +" "+ PDday.value +" "+ PDyear.value +" "+PDhours.value+":"+PDminutes.value+":00:001");
             var paidByName;
             for (var i=0; i<applicants.length; i++){
                 if (applicants[i].applicantID == paidByTenantID.value) {
                     paidByName = applicants[i].name;
                 };
             };
             console.log("New Income from "+paidByName);
             newPostRef = billsRef.push();
             newPostRef.set({//entered by user
                 account: Number(account.value), 
                 amountPaid: Number(amountPaid.value),
                 paidByTenantID: paidByTenantID.value,
                 building: building.value,
                 description: paidByName+" "+description.value,
                 dueDate: Number(dueDate),
                 payDate: Number(payDate),
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