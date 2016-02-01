/* Pull in the accounts table to match account number to account label 
*/

(function() {
     function accountType($firebaseArray) {
         
         

         //get firebase reference
         var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
         var accountsRef = rootRef.child('accounts');
         // put reference into an array
         var accountNum = $firebaseArray(accountsRef);



         /* look up the bills.account number in the accounts table to find the matching number.
         * Return the value for the matching number
         * If the value is "Owner Draw" return "Deposit to Owner" instead
         */
         return function(number) {
             for (var i = 0; i < accountNum.length; i++){
                 if (Number(number) == Number(accountNum[i].$id)) {
                     if (accountNum[i].$value == "Owner Draw") {
                         return "Deposit to "; //{{item.portfolio}} is owner's name
                     } else return accountNum[i].$value;
                 }
             };



         };
     }
 
     angular
         .module('propertyManagement')
         .filter('accountType', accountType);
 })();

//Unlike services, we do not need to inject a filter as a dependency unless we use it within the code of an Angular component, such as a service, directive, or controller. For Bloc Jams, we'll use the filter in the html view only, and therefore won't need to inject it as a dependency anywhere.