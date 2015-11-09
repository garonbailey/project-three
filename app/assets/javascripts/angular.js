var app = angular.module('HelpOut', ['ngRoute']);

app.controller('postCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.name = 'postCtrl';
	this.id = $routeParams.id;
	this.message = "I work, sort of. Actually, no I don't.";
}]);

app.controller('newPostCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "I'm still working. This is the new post page/home screen.";
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true });
	$routeProvider.
		when('/', {
			templateUrl: '/angular_templates/home.html',
			controller: 'newPostCtrl',
			controllerAs: 'ctrl'
		}).
		when('/new', {
			templateUrl: '/angular_templates/new.html',
			controller: 'postCtrl',
			controllerAs: 'ctrl'
		});
		// otherwise({
		// 	redirectTo: ''
		// });
}]);
