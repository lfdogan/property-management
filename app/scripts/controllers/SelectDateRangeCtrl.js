(function() {
     function SelectDateRangeCtrl(Data) { //services injected

         
//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.Data = Data;

         //initial value for setRange is on page load and it is not updated on page
         var setNumDays = Data.globalNumDays;
         this.setNumDays = Data.globalNumDays;
//         console.log("initial value of setNumDays on SelectDateRangeCtrl:",setNumDays);
         

         /* runs changeDateRange() in Data.js service on page load
         * it is needed to highlight active cell of date selection bar. 
         * title dates and data are correct without this statement
         */
         Data.changeDateRange(setNumDays);
         
         //still adds empty option
//         var initial_date_selection = document.querySelector("#last30Days");
//         console.log(initial_date_selection);
//         initial_date_selection.setAttribute("selected","selected"); //for <option>'s <select> element




         /*The ngOptions attribute can be used to dynamically generate a list of <option> elements for the <select> element using the array or object obtained by evaluating the ngOptions comprehension expression. In many cases, ngRepeat can be used on <option> elements instead of ngOptions to achieve a similar result. */
//         var select_ngRepeat = [
//                 {"numDays": 30, "text": 'Last 30 Days'},
//                 {"numDays": 365, "text": 'Current Year'},
//                 {"numDays": 9999, "text": '6/1/15-8/15/15'}
//             ];
//         this.select_ngRepeat = select_ngRepeat;
    

         
         //doesn't run on page load
         this.my_change = function(){
             var newNumDays = document.getElementById('date-selector').value;
             console.log("my_change() from date-selector:",newNumDays);
             Data.changeDateRange(newNumDays);
         };
         
         
         
         
         //doesn't remove initial empty value
         //this.my_change();
         
         
         
         
         
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