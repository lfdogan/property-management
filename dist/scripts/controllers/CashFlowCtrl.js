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
         
         

         
/************************** FOR ADDING NEW TRANSACTIONS **************************/
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
         var monthBD = document.getElementById('monthBD');
         var dayBD = document.getElementById('dayBD');
         var yearBD = document.getElementById('yearBD');
         var hoursBD = document.getElementById('hoursBD');
         var minutesBD = document.getElementById('minutesBD');
         //dueDate
         var monthDD = document.getElementById('monthDD');
         var dayDD = document.getElementById('dayDD');
         var yearDD = document.getElementById('yearDD');
         //var payDate = document.getElementById('payDate');
         var monthPD = document.getElementById('monthPD');
         var dayPD = document.getElementById('dayPD');
         var yearPD = document.getElementById('yearPD');
         var hoursPD = document.getElementById('hoursPD');
         var minutesPD = document.getElementById('minutesPD');
         
         var btnNewTransaction = document.getElementById('btnNewTransaction');
         
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
         
         var resetValues = function (){
             billNumber.value = "";
             cost.value = "";
             amountPaid.value = "";
             vendor.value = "";
             description.value = "";
             vendor.value = "";
             referenceNum.value = "";
         };
         
         var getMS = function(stringDate){
             return stringDate.valueOf();
         };
         
         var paidByName = function() {
             for (var i=0; i<applicants.length; i++){
                     if (applicants[i].applicantID == paidByTenantID.value) {
                         return applicants[i].name;
                     };
                 };
             };
         var postID;
         var newPostRef;
         
         //when user clicks on button... save to firebase:
         //.set() replaces previous value of 'currentMessage' child with new value from input box
         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
         // Clear out value of input textbox to empty to prepare for next entry
         
         //Add new bill
         btnNewTransaction.addEventListener('click', function(){
                      
             //format is Jan 17 2016 09:51:201
             var stringDD = new Date(monthDD.value +" "+ dayDD.value +" "+ yearDD.value +" "+ hoursPD.value+":"+ minutesPD.value+":01");
             var stringPD = new Date(monthPD.value +" "+ dayPD.value +" "+ yearPD.value +" "+ hoursPD.value+":"+ minutesPD.value+":01");
             // Return the primitive value of a Date object (in milliseconds)
             var dueDate = stringDD.valueOf();
             var payDate = stringPD.valueOf();
             newPostRef = billsRef.push();
             newPostRef.set({
                 account: Number(account.value),
                 dueDate: Number(dueDate),
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
             var postIDRef = billsRef.child(postID);//assign the postIDRef to the new child
             if (account.value < 2000) {//owner draw/contribution
                 postIDRef.update({'amountPaid': Number(amountPaid.value)});
                 postIDRef.update({'description': "Owner Draw "+Data.mdyy(payDate)});
                 postIDRef.update({'payDate': Number(payDate)});
                 postIDRef.update({'portfolio': portfolio.value});
                 postIDRef.update({'referenceNum': referenceNum.value});
                 if (description.value != "") {
                     postIDRef.update({'description': "Owner Draw "+Data.mdyy(payDate)+" "+description.value});
                 };
                 console.log("New Owner Draw $"+Number(amountPaid.value));
             };
             if (4000 <= account.value && account.value < 5000) {//Add new income
                 postIDRef.update({'amountPaid': Number(amountPaid.value)});
                 postIDRef.update({'paidByTenantID': paidByTenantID.value});
                 postIDRef.update({'building': building.value});
                 postIDRef.update({'description': paidByName() +" "+description.value});
                 postIDRef.update({'payDate': Number(payDate)});
                 console.log("New Income from "+ paidByName());
                 
             };
             if (5000 <= account.value) {//BILLS
                 if (status.value == "Paid") {
                     postIDRef.update({'payDate': Number(payDate)});
                     postIDRef.update({'amountPaid': Number(amountPaid.value)});
                 };                 
                 var stringBD = new Date(monthBD.value +" "+ dayBD.value +" "+ yearBD.value +" "+ hoursBD.value+":"+ minutesBD.value+":01");
                 var billDate = stringBD.valueOf();
                 postIDRef.update({'billDate': Number(billDate)});
                 postIDRef.update({'billNumber': Number(billNumber.value)});
                 postIDRef.update({'building': building.value});
                 postIDRef.update({'cost': Number(cost.value)});
                 if (description.value != "") postIDRef.update({'description': description.value});
                 postIDRef.update({'status': status.value});
                 if (vendor.value != "") postIDRef.update({'vendor': vendor.value});
                 if (workOrderNumber.value != "") postIDRef.update({'workOrderNumber': Number(workOrderNumber.value)});
                 console.log("New Bill $"+amountPaid.value);
             };
             resetValues();             
         });
/* ************************* end for adding new TRANSACTIONS ************************************ */
         
         
         
         
       
     }
 
     angular
         .module('propertyManagement')
         .controller('CashFlowCtrl', ['Data', CashFlowCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();