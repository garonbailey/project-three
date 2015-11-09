var app = angular.module('HelpOut', ['ngRoute']);

app.controller('loginCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "I'm the login controller."
}]);

app.controller('newPostCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "I'm still working. This is the new post page/home screen.";
}]);

app.controller('allPostsCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "All Posts Page";
}]);

app.controller('closedPostsCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "Closed Posts Controller";
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true });
	$routeProvider.
		when('/', {
			templateUrl: '/angular_templates/home.html',
			controller: 'newPostCtrl',
			controllerAs: 'ctrl'
		}).
		when('/login', {
			templateUrl: '/angular_templates/login.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl'
		}).
		when('/reports', {
			templateUrl: '/angular_templates/all_posts.html',
			controller: 'allPostsCtrl',
			controllerAs: 'ctrl'
		}).
		when('/closed', {
			templateUrl: '/angular_templates/closed_posts.html',
			controller: 'closedPostsCtrl',
			controllerAs: 'ctrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);