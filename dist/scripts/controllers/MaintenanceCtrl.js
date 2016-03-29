 (function() {
     function MaintenanceCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Maintenance";


         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.allBills = Data.allBills();

         this.allMaintenance = Data.allMaintenance(); // the ARRAY of objects from the Firebase database
         this.filteredMaintenance = Data.filteredMaintenance();
         this.allPendingMaintenance = Data.allPendingMaintenance();
         this.allOpenMaintenance = Data.allOpenMaintenance();
         this.allClosedMaintenance = Data.allClosedMaintenance();

         Data.followMyAccountLink();

         this.Data = Data;
         this.months = Data.months;
         
         this.myBuildings = Data.myBuildings();
         
         //sets top navigation link styling on page load
         Data.setNavLinkStyling("maintenance");
         
         
         /* for the workOrder.html page to show only the information for specified work order
         * ng-show="ctrl.getSingleWorkOrder( {{workOrderNumber}}, {{item}} )
         * {{workOrderNumber}} was passed from previous page when user clicks on a workOrderNumber
         * item is each of the object elements from the allMaintenance array
         */
         this.getSingleWorkOrder = function(wonum, item){
             if (wonum == item.workOrderNumber) return true;
         };
         
         
         
         /* new variables setColumnSort and reverse are used to sort table data by column
         * setColumnSort gets information from Data.js inital value is 'payDate'
         * reverse will sort descending for reverse=true, ascending for reverse=false
         * function order() checks if user clicks on same column heading: if true reverse will switch order
         * if false user clicked on different column so set order to descending
         */
         this.setColumnSort = 'dateCompleted';
         this.reverse = true;
         this.order = function(setColumnSort) {
             if (this.setColumnSort === setColumnSort) { 
                     this.reverse = !this.reverse;
                 } else this.reverse = true;
             this.setColumnSort = setColumnSort;
         };
         

         this.getSum = function(workOrderNumber){
             var sum = 0;
             for (var i=0; i < this.allBills.length; i++ ){
                 var bill = this.allBills[i];
                 var billWorkOrder = bill.workOrderNumber || "";
//                 console.log(bill.workOrderNumber);
                     if (billWorkOrder == workOrderNumber) {
                         sum = sum + bill.amountPaid;
                         //console.log("current sum:",sum);
                     }
                 }
             //console.log("total:", sum);
             return sum;
         };
                 
/************************** FOR ADDING NEW Work Order Requests **************************/
/*
         var maintenanceRef = new Firebase("https://property-management-lfdogan.firebaseio.com/maintenance");
        
         var workOrderNumber = document.getElementById('workOrderNumber');
         var status = document.getElementById('status');
         var approved = document.getElementById('approved');
         var building = document.getElementById('building');
         var description = document.getElementById('description');
         var specificLocation = document.getElementById('specificLocation');
         //Date Created
         var monthDC = document.getElementById('monthDC');
         var dayDC = document.getElementById('dayDC');
         var yearDC = document.getElementById('yearDC');
         var hourDC = document.getElementById('hourDC');
         var minuteDC = document.getElementById('minuteDC');
         //Date Started
         var monthDS = document.getElementById('monthDS');
         var dayDS = document.getElementById('dayDS');
         var yearDS = document.getElementById('yearDS');
         var hourDS = document.getElementById('hourDS');
         var minuteDS = document.getElementById('minuteDS');
         //Date Finished
         var monthDF = document.getElementById('monthDF');
         var dayDF = document.getElementById('dayDF');
         var yearDF = document.getElementById('yearDF');
         var hourDF = document.getElementById('hourDF');
         var minuteDF = document.getElementById('minuteDF');
         var estimatedCost = document.getElementById('estimatedCost');
         var closingComments = document.getElementById('closingComments');
         var btnNewWorkOrder = document.getElementById('btnNewWorkOrder'); //button to submit new maintenance request
    
         
         
         //when user clicks on update button... save to firebase:
         //.set() replaces previous value of 'currentMessage' child with new value from input box
         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
         // Clear out value of input textbox to empty to prepare for next entry     
         var postID;
         var newPostRef;
         btnNewWorkOrder.addEventListener('click', function(){
             var dateCreated = new Date(monthDC.value +" "+ dayDC.value +" "+ yearDC.value +" "+ hourDC.value +":"+ minuteDC.value +":00:001");
             var dateStarted = new Date(monthDS.value +" "+ dayDS.value +" "+ yearDS.value +" "+ hourDS.value +":"+ minuteDS.value +":00:001");
             var dateFinished = new Date(monthDF.value +" "+ dayDF.value +" "+ yearDF.value +" "+ hourDF.value +":"+ minuteDF.value +":00:001");
             if (building.value == "216554THSTREE") {
                 newPostRef = maintenanceRef.push();
             };
             newPostRef.set({//replaces all data with new data
                 workOrderNumber: Number(workOrderNumber.value),
                 status: status.value,
                 approved: approved.value,
                 building: building.value,
                 description: description.value,
                 dateCreated: Number(dateCreated), //convert text object date to ms. leaseBegin.valueOf() == Number(leaseBegin)
                 estimatedCost: Number(estimatedCost.value),
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when request was saved
             });
             postID = newPostRef.key();
             var postIDRef = maintenanceRef.child(postID);//assign the postIDRef to the new child
             //if user entered data, add to the database
             if (specificLocation.value != "") postIDRef.update({'specificLocation': specificLocation.value});
             if (approved.value != "Pending") {
                 postIDRef.update({'dateStarted': Number(dateStarted)});
             };
             if (status.value = "Closed") {
                 postIDRef.update({'dateCompleted:': Number(dateFinished)});
                 if (closingComments.value != "") postIDRef.update({'closingComments': closingComments.value});
             };
             console.log("New Maintenance Request "+dateCreated);
             workOrderNumber.value = '';
             estimatedCost.value = '';
             description.value = '';
             estimatedCost.value = '';
             specificLocation.value = '';
             closingComments.value = '';
         });
/************************** FOR ADDING NEW Work Order Requests **************************/
         
         
         
       
     }
 
     angular
         .module('propertyManagement')
         .controller('MaintenanceCtrl', ['Data', MaintenanceCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();

/* 1/12/16 when moving functions out of BillsCtrl.js into Message.js you must have:
function BillsCtrl(Bills)
this.Bills = Bills;
.controller('BillsCtrl', ['Bills', BillsCtrl]);
along with the correct path in the html ( {{ bills.Bills.labelPriority(bills.priority) }} )
*/