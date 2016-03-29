/* Pull in the employees table to match id with name
*/

(function() {
     function employeeName($firebaseArray) {
         
         


         var employeesRef = new Firebase("https://property-management-lfdogan.firebaseio.com/employees");

         // put reference into an array
         var employeesInfo = $firebaseArray(employeesRef);




         return function(employee_id) {
             for (var i = 0; i < employeesInfo.length; i++){
                 if (employee_id == employeesInfo[i].$id) {
                     return employeesInfo[i].teamName;
                 }
             };



         };
     }
 
     angular
         .module('propertyManagement')
         .filter('employeeName', employeeName);
 })();

//Unlike services, we do not need to inject a filter as a dependency unless we use it within the code of an Angular component, such as a service, directive, or controller. For Bloc Jams, we'll use the filter in the html view only, and therefore won't need to inject it as a dependency anywhere.