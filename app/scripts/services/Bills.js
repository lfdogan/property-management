//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Bills($firebaseArray) {//Inject dependencies and the additional services into the this service. B

        // Firebase database references
        var rootRef = new Firebase("https://property-management-lfdogan.firebaseio.com/");
        var billsRef = rootRef.child('bills');
        
        
            //get all tasks from database
            //'all' is ordered by default (index)
            //in the controller Messages is renamed allMessages and html ng-repeat calls allMessages        
        var Bills = {
            key: function() {
                return $firebaseArray(billsRef); //order tasks by unique key (also dateAdded)
            },
            priority: function() {
                return $firebaseArray(billsRef.orderByChild("priority"));
            },
            completed: function() {
                return $firebaseArray(billsRef.orderByChild("completed")); //order tasks in order of completion            
            },
            value: function() {
                return $firebaseArray(billsRef.orderByChild("value")); //order tasks alphabetically
            }            
        };
        
        

              
        
        return Bills;
        

        
        
        
/*************************************************************************************/
    }
    
    angular
        .module('propertyManagement')
        .factory('Bills', Bills);
})();