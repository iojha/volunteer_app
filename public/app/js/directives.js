'use strict';

/* Directives */

angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

//----------------> DALLAS: THIS IS NOT SHOWING UP IN HTML
 .directive('searchResults',function(){
	return {
		template: 'Name: Isha Ojha'
	};
});
