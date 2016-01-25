 (function() {
     function MaintenanceCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Maintenance";

         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.allBills = Data.allBills();

         this.allMaintenance = Data.allMaintenance(); // the ARRAY of objects from the Firebase database
         this.filteredMaintenance = Data.filteredMaintenance();
         this.allPendingMaintenance = Data.allPendingMaintenance();
         this.allOpenMaintenance = Data.allOpenMaintenance();
         this.allClosedMaintenance = Data.allClosedMaintenance();


         document.querySelector("#nav-bills").classList.remove("active");
         document.querySelector("#nav-cashflow").classList.remove("active");
         document.querySelector("#nav-maintenance").classList.add("active");
         document.querySelector("#nav-overview").classList.remove("active");
         document.querySelector("#nav-statements").classList.remove("active");     
         
         
         
                 
          /******** FOR ADDING NEW DATA ********/
/*
        var workOrderNumber = document.getElementById('workOrderNumber'); 
        var dateCreated = document.getElementById('dateCreated');
        var dateStarted = document.getElementById('dateStarted');
        var dateCompleted = document.getElementById('dateCompleted');
        var building = document.getElementById('building'); 
        var estimatedCost = document.getElementById('estimatedCost'); 
        var invoicedCost = document.getElementById('invoicedCost'); 
        var status = document.getElementById('status'); 
        var approved = document.getElementById('approved'); 
        var description = document.getElementById('description');
        var closingComments = document.getElementById('closingComments');
        var billsListing = document.getElementById('billsListing');
       
        
        
        var btnNewItemUpdate = document.getElementById('btnNewItemUpdate'); //update button for new bill
    
         
         
         //when user clicks on update button... save to firebase:
         //.set() replaces previous value of 'currentMessage' child with new value from input box
         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
         // Clear out value of input textbox to empty to prepare for next entry     
         var postID;
         var newPostRef;
         btnNewItemUpdate.addEventListener('click', function(){
             console.log("UPDATE");
             //newPostRef = billsRef.push();
             newPostRef = maintenanceRef.push();
             newPostRef.set({
                 workOrderNumber: workOrderNumber.value, //entered by user
                 dateCreated: dateCreated.value, //entered by user
                 dateStarted: dateStarted.value, //entered by user
                 dateCompleted: dateCompleted.value, //entered by user
                 building: "2165 54th St", //entered by user
                 estimatedCost: estimatedCost.value, //entered by user
                 invoicedCost: invoicedCost.value, //entered by user
                 status: "Closed",
                 approved: approved.value, //entered by user
                 description: description.value, //entered by user
                 closingComments: closingComments.value, //entered by user
                 billsListing: billsListing.value, //entered by user
                 dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
             });
             postID = newPostRef.key();
             workOrderNumber.value = '';
             dateCreated.value = '';
             building.value = '2165 54th St';
             estimatedCost.value = '';
             invoicedCost.value = '';
             status.value = 'Closed';
             approved.value = '';
             description.value = '';
         });
         
    */
        
         
         /******************/
         
         
         
       
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