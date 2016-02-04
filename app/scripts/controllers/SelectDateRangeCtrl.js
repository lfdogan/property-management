(function() {
     function SelectDateRangeCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.Data = Data;

         //initial value for setRange is on page load and it is not updated on page
         var setNumDays = Data.globalNumDays;
         console.log("initial value of setNumDays on SelectDateRangeCtrl:",setNumDays);
         

         /* works on page load to highlight active cell of date selection bar. 
         * title dates and data are correct without this statement
         */
         Data.changeDateRange(setNumDays);
         //console.log("setNumDays from SelectDateRangeCtrl:",setNumDays);


         
         

         this.my_change = function(){
             var newNumDays = document.getElementById('date-selector').value;
             console.log("my change from date-selector:",newNumDays);
             Data.changeDateRange(newNumDays);
         };
         
         
         
         
         //This function is never called and not needed
//         this.changeDateRange = function(days) {
//             console.log("running this.changeDateRange() on SelectDateRangeCtrl");
//             Data.changeDateRange(days, $scope);
//        };
         
     }
 
     angular
         .module('propertyManagement')
         .controller('SelectDateRangeCtrl', ['Data', SelectDateRangeCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();