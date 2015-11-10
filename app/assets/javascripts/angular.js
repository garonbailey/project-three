var app = angular.module('HelpOut', ['ngRoute', 'ngMap']);

app.controller('loginCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.login = function () {
		$http.post('/session', {

		});
	};

	this.signUp = function () {
		$http.post('/responders', {

		});
	}
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

app.controller('allPostsCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
	this.message = "Posts Index; Fill in .json get request later.";
	var controller = this;
	$http.get('/posts.json').success(function (postsData) {
		controller.posts = postsData.posts;
		console.log(controller.posts);
	});
}]);

app.controller('closedPostsCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "Closed Posts Controller";
}]);

app.controller('singlePostCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var currentId = $routeParams.id;
	var controller = this;
	$http.get('/posts.json').success(function (data) {
		controller.currentPost = data.posts[currentId - 1];
	});
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
			redirectTo: '/login'
		}).
		when('/posts', {
			templateUrl: '/angular_templates/all_posts.html',
			controller: 'allPostsCtrl',
			controllerAs: 'ctrl'
		}).
		when('/posts/:id', {
			templateUrl: '/angular_templates/one_post.html',
			controller: 'singlePostCtrl',
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
