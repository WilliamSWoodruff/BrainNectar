
require('./controllers/controllers');
require('./services/services');
var appModule = require('./appModule');

// replaces ng-app="BrainNectar"
angular.element(document).ready(function () {  
  angular.bootstrap(document, [appModule.name], {
    
  });
});
