 

(function() {
     function byRange(billDate, beginDateRange, endDateRange){
         console.log(billDate);
//         if(beginDate === undefined) beginDate = Number.MIN_VALUE;
//         if(endDate === undefined) endDate = Number.MAX_VALUE;
//         return function predicateFunc(item){
//             return beginDate <= item[fieldName] && item[fieldName] <= endDate;
//         };
         if (beginDateRange < endDateRange) {
             if (beginDateRange < billDate && billDate < endDateRange){
                 return billDate;
             };
         } return "error";
         


     }
 
     angular
         .module('propertyManagement')
         .filter('byRange', byRange);
 })();

//Unlike services, we do not need to inject a filter as a dependency unless we use it within the code of an Angular component, such as a service, directive, or controller. For this project, we'll use the filter in the html view only, and therefore won't need to inject it as a dependency anywhere.