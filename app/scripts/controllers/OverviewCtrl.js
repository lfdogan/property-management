(function() {
     function OverviewCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         


         this.Data = Data;
         this.beginDateRange = Data.beginDateRange;
         this.endDateRange = Data.endDateRange;
         
         this.allBills = Data.allBills();

         this.allMaintenance = Data.allMaintenance(); // the ARRAY of objects from the Firebase database
         this.filteredMaintenance = Data.filteredMaintenance();
         this.allPendingMaintenance = Data.allPendingMaintenance();
         this.allOpenMaintenance = Data.allOpenMaintenance();
         this.allClosedMaintenance = Data.allClosedMaintenance();
         
         this.latestStatement = Data.latestStatement();
         this.latestTransactions = Data.latestTransactions();

         document.querySelector("#nav-bills").classList.remove("active");
         document.querySelector("#nav-cashflow").classList.remove("active");
         document.querySelector("#nav-maintenance").classList.remove("active");
         document.querySelector("#nav-overview").classList.add("active");
         document.querySelector("#nav-statements").classList.remove("active");
         
     }
 
     angular
         .module('propertyManagement')
         .controller('OverviewCtrl', ['Data', OverviewCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();