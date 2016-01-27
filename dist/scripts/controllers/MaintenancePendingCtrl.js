 (function() {
     function MaintenancePendingCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.Data = Data;

         

         this.allMaintenance = Data.allMaintenance(); // the ARRAY of objects from the Firebase database
         this.filteredMaintenance = Data.filteredMaintenance();
         this.allPendingMaintenance = Data.allPendingMaintenance();



         
         
         
       
     }
 
     angular
         .module('propertyManagement')
         .controller('MaintenancePendingCtrl', ['Data', MaintenancePendingCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();