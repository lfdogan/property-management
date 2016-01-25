(function() {
     function MyAccountCtrl(Data) {
         

         this.Data = Data;
         this.toggleMyAccountDropdown = Data.toggleMyAccountDropdown();




         
     }
 
     angular
         .module('propertyManagement')
         .controller('MyAccountCtrl', ['Data', MyAccountCtrl]);
 })();