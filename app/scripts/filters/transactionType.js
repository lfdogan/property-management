(function() {
     function transactionType() {

         return function(text) {
             if (text == "Owner Draw") {
                 return "Deposit";
             } else return text;
         };
     }
 
     angular
         .module('propertyManagement')
         .filter('transactionType', transactionType);
 })();

//Unlike services, we do not need to inject a filter as a dependency unless we use it within the code of an Angular component, such as a service, directive, or controller. For Bloc Jams, we'll use the filter in the html view only, and therefore won't need to inject it as a dependency anywhere.