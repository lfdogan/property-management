(function() {
     function MyAccountCtrl() {
         

         
         
         var maActive = false;
                  
         
         this.toggleMyAccountDropdown = function(){
             console.log("click on my account");
             if (maActive){
                 document.querySelector(".dropdown-content").classList.remove("ma-active");
                 maActive = false;
             } else {
                 document.querySelector(".dropdown-content").classList.add("ma-active");
                 maActive = true;
             }
         };



         
     }
 
     angular
         .module('propertyManagement')
         .controller('MyAccountCtrl', MyAccountCtrl);
 })();