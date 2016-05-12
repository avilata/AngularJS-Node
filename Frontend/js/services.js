
    var app = angular.module('services', []);
    app.factory('halaService',function($resource){
    return $resource('http://localhost:3000/players/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        },
		 remove: {
            method: 'DELETE'
        }
    });
    // app.factory('myService', function() {
    //  var savedData = {}
    //  function set(data) {
    //    savedData = data;
    //  }
    //  function get() {
    //   return savedData;
    //  }
    //
    //  return {
    //   set: set,
    //   get: get
    //  }
    //
    // });
})
//.service('halaService',function($window){
 //   this.showPopup=function(message){
 //       return $window.confirm(message);
 //   }
//});
