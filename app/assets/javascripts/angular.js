var app = angular.module('HelpOut', ['ngRoute', 'ngMap']);

app.controller('loginCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "I'm the login controller."
}]);

app.controller('newPostCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
	var map;
	  $scope.$on('mapInitialized', function(evt, evtMap) {
	    map = evtMap;
	    $scope.placeMarker = function(e) {
	      var marker = new google.maps.Marker({position: e.latLng, map: map});
	      map.panTo(e.latLng);
						console.log(marker.position.lat())
						console.log(marker.position.lng())
						console.log(marker)
	    }
	  });

	var controller = this;
	this.newReport = function () {
		console.log("I AM DEFINITELY IN HERE");

		$http.post('/posts', {
			post: {
				location: controller.location,
				usernotes: controller.usernotes
			}
		}).
		success(function(data) {
			console.log("DATA", data);
			if (data.errors) {
				controller.error = data.errors;
			} else {
				controller.message = data.message;
			}
		});
	}
}]);

app.controller('allPostsCtrl', ['$routeParams', '$http', '$scope', function ($scope, $routeParams, $http) {
	this.message = "Posts Index; Fill in .json get request later.";
	var controller = this;
	$http.get('/posts.json').success(function (postsData) {
		controller.posts = postsData;
	});
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
