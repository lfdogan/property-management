//The root Angular module will act as a container for different parts of our application.

 (function() {
     function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,/*hashbang URLs are disabled; that is, users will see clean URLs without the hashbang*/
                requireBase: false/*unrelated to the hashbang issue, but is one way to avoid a common $location error.*/
         });
         $stateProvider
             .state('overview', {
                 url: '/',
                 controller: 'OverviewCtrl as overview',//in LandingCtrl.js refer to variables as this.title but in landing.html as landing.title
                 templateUrl: '/templates/overview.html'
             })
             .state('cashflow', {
                 url: '/cashflow',
                 controller: 'CashflowCtrl as cashflow',
                 templateUrl: '/templates/cashflow.html'
             })
             .state('maintenance', {
                 url: '/maintenance',
                 controller: 'MaintenanceCtrl as maintenance',
                 templateUrl: '/templates/maintenance.html'
             })
             .state('bills', {
                 url: '/bills',
                 controller: 'BillsCtrl as bills',
                 templateUrl: '/templates/bills.html'  
             })
             .state('statements', {
                 url: '/statements',
                 controller: 'StatementsCtrl as statements',
                 templateUrl: '/templates/statements.html'                    
         });
     }
//define a module with angular.module:
//The first argument passed, blocJams, is the prescribed name of the module. The array, passed as the second argument, injects dependencies into an application.
     angular
         .module('propertyManagement', ['ui.router', 'firebase'])
         .config(config);
 })();