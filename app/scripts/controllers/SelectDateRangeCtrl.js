(function() {
     function SelectDateRangeCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.Data = Data;

         //initial value for setRange is on page load and it is not updated on page
         var setNumDays = Data.globalNumDays;
//         console.log("initial value of setNumDays on SelectDateRangeCtrl:",setNumDays);
         

         /* runs changeDateRange() in Data.js service on page load
         * it is needed to highlight active cell of date selection bar. 
         * title dates and data are correct without this statement
         */
         Data.changeDateRange(setNumDays);


         /*The ngOptions attribute can be used to dynamically generate a list of <option> elements for the <select> element using the array or object obtained by evaluating the ngOptions comprehension expression. In many cases, ngRepeat can be used on <option> elements instead of ngOptions to achieve a similar result. */
         this.select_ngRepeat =  [
                 {id: '30', name: 'Last 30 Days'},
                 {id: '365', name: 'Current Year'},
                 {id: '9999', name: '6/1/15-8/15/15'}
             ];
    

         this.my_change = function(){
             var newNumDays = document.getElementById('date-selector').value;
//             console.log("my_change() from date-selector:",newNumDays);
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