(function() {
     function MyAccountCtrl(Data) {
         

         this.Data = Data;
         this.toggleMyAccountDropdown = Data.toggleMyAccountDropdown();
         this.followMyAccountLink = Data.followMyAccountLink();
         this.myPortfolio = Data.myPortfolio();
         this.myBuildings = Data.myBuildings();

         

         
         Data.followMyAccountLink();




         
     }
 
     angular
         .module('propertyManagement')
         .controller('MyAccountCtrl', ['Data', MyAccountCtrl]);
 })();