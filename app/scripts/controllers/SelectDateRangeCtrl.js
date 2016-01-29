 (function() {
     function SelectDateRangeCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.Data = Data;

         var setRange = Data.globalNumDays;
         Data.changeDateRange(setRange);
         

         this.changeDateRange = function(days) {
             console.log("running SelectDateRangeCtrl.... changeDateRange()");
             Data.changeDateRange(days, $scope);
         };
     
     }
 
     angular
         .module('propertyManagement')
         .controller('SelectDateRangeCtrl', ['Data', SelectDateRangeCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();