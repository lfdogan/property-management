/* Pull in the buildings table to match building abbreviation with nickname
*/

(function() {
     function buildingNickname($firebaseArray) {
         
         

         //get firebase reference
         var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
         var buildingsRef = rootRef.child('buildings');
         // put reference into an array
         var buildingsInfo = $firebaseArray(buildingsRef);



         /* look up the bills.account number in the accounts table to find the matching number.
         * Return the value for the matching number
         * If the value is "Owner Draw" return "Deposit to Owner" instead
         */
         return function(building_abbreviation) {
             for (var i = 0; i < buildingsInfo.length; i++){
                 if (building_abbreviation == buildingsInfo[i].$id) {
                     return buildingsInfo[i].nickname;
                 }
             };



         };
     }
 
     angular
         .module('propertyManagement')
         .filter('buildingNickname', buildingNickname);
 })();

//Unlike services, we do not need to inject a filter as a dependency unless we use it within the code of an Angular component, such as a service, directive, or controller. For Bloc Jams, we'll use the filter in the html view only, and therefore won't need to inject it as a dependency anywhere.