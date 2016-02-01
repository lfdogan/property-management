 (function() {
     function SelectDateRangeCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.Data = Data;

         //initial value for setRange is on page load and it is not updated on page
         var setRange = Data.globalNumDays;
<<<<<<< HEAD
=======
         console.log("setRange from SelectDateRangeCtrl:",setRange);
>>>>>>> move-select-date-range

         /* works on page load to highlight active cell of date selection bar. 
         * title dates and data are correct without this statement
         */
<<<<<<< HEAD
         Data.changeDateRange(setRange);
         
=======
         //Data.changeDateRange(setRange);
 
         this.changeDateRange = function(value) {
             console.log("runs");
             console.log(value);
         };
>>>>>>> move-select-date-range

         //This function is never called and not needed
//         this.changeDateRange = function(days) {
//             Data.changeDateRange(days, $scope);
//        };
         
     }
 
     angular
         .module('propertyManagement')
         .controller('SelectDateRangeCtrl', ['Data', SelectDateRangeCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();