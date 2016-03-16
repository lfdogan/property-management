(function() {
     function OwnerLoginCtrl(Data) { //services injected

         
         this.title = "Owner Login";
         Data.followMyAccountLink();

     }
 
     angular
         .module('propertyManagement')
         .controller('OwnerLoginCtrl', OwnerLoginCtrl);
 })();