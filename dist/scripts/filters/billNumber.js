/*
function: labelPriority()
used in html to transform priority value from a number to text
1: high, 2: medium, 3: low
takes in the value of allMessages/key/priority
converts the value to a number
returns corresponding string
*/   

(function() {
     function billNumber() {

         return function(number) {
             if (number == undefined) {
                 return;
             } else return "Bill#"+ number; //show 9125 as Bill#9125

         };
     }
 
     angular
         .module('propertyManagement')
         .filter('billNumber', billNumber);
 })();

//Unlike services, we do not need to inject a filter as a dependency unless we use it within the code of an Angular component, such as a service, directive, or controller. For Bloc Jams, we'll use the filter in the html view only, and therefore won't need to inject it as a dependency anywhere.