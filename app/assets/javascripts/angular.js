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
	var controller = this;

  $scope.$on('mapInitialized', function(evt, evtMap) {
    map = evtMap;
    $scope.placeMarker = function(e) {
      var marker = new google.maps.Marker({position: e.latLng, map: map});
      map.panTo(e.latLng);
			controller.lat = marker.position.lat();
			controller.lng = marker.position.lng();
    };
		evtMap.setOptions({'scrollwheel': false})
  });



	this.newReport = function () {
		$http.post('/posts', {
			post: {
				latitude: controller.lat,
				longitude: controller.lng,
				usernotes: controller.usernotes
			}
		}).
		success(function(data) {
			if (data.errors) {
				controller.error = data.errors;
				controller.message = "Error submitting report";
			} else {
				controller.message = "New Report Successful!";
				controller.location = undefined;
				controller.usernotes = undefined;
			}
		});
	}
}]);

app.controller('allPostsCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
	var controller = this;
	$http.get('/posts.json').success(function (postsData) {
		console.log(postsData)
		controller.posts = postsData.posts;
	});
}]);

app.controller('closedPostsCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	this.message = "Closed Posts Controller";
}]);

app.controller('singlePostCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var post = $routeParams.index;
	var controller = this;
	$http.get('/posts.json').success(function (data) {
		controller.currentPost = data.posts[post];
	});
}]);

app.controller('postCommentsCtrl', ['$http', '$scope', function ($http, $scope) {
	var controller = this;
	controller.createComment = function () {
		$http.post('/comments', {
			comment: {
				notes: controller.newCommentText
				// responder: //currentResponder?
				// post: //currentPost?
			}
		}).
		success(function (data) {
			if (data.errors) {
				controller.error = data.errors;
				controller.message = "Error submitting comment. Please try again.";
			} else {
				controller.message = "New Comment Successful!";
				controller.newCommentText = undefined;
			}
		})
	};
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
		when('/logout', {
			redirectTo: '/logout'
		}).
		when('/posts', {
			templateUrl: '/angular_templates/all_posts.html',
			controller: 'allPostsCtrl',
			controllerAs: 'ctrl'
		}).
		when('/posts/:index', {
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
