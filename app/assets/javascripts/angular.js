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
	var marker;
  $scope.$on('mapInitialized', function(evt, evtMap) {
    map = evtMap;
		evtMap.setOptions({'scrollwheel': false});
    $scope.placeMarker = function(e) {
			if (marker) {
				marker.setPosition(e.latLng)
				controller.lat = marker.position.lat();
				controller.lng = marker.position.lng();
			} else {
      marker = new google.maps.Marker({position: e.latLng, map: map});
      map.panTo(e.latLng);
			controller.lat = marker.position.lat();
			controller.lng = marker.position.lng();
    }}
  });



	this.newReport = function () {
		$http.post('/posts', {
			post: {
				latitude: controller.lat,
				longitude: controller.lng,
				usernotes: controller.usernotes,
				contactname: controller.contactname,
				contactemail: controller.contactemail,
				contactphone: controller.contactphone
			}
		}).
		success(function(data) {
			if (data.errors) {
				controller.error = data.errors;
				controller.message = "Something broke...";
			} else {
				controller.message = "A responder is on the way!";
				controller.location = undefined;
				controller.usernotes = undefined;
				controller.contactname = undefined;
				controller.contactemail = undefined;
				controller.contactphone = undefined;
			}
		});
	}
}]);

app.controller('allPostsCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
	var controller = this;
	$http.get('/posts.json').success(function (postsData) {
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
		console.log(controller.currentPost.id)

		controller.getPostsComments(data.posts[post]);
	});
	controller.getCurrentResponder = function () {
		$http.get('/session.json').success(function (responderData) {
			controller.responderId = responderData.current_responder.id;
		})
	};
	controller.getCurrentResponder();

	controller.getPostsComments = function () {
		$http.get('/comments_all/' + $routeParams.index).success(function (commentData) {
			controller.comments = commentData;
			console.log(controller.comments);
		})
	};
	controller.getPostsComments();
}]);

app.controller('postCommentsCtrl', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	var controller = this;

	controller.createComment = function () {
		console.log("Let's make a comment");
		$http.post('/comments', {
			authenticity_token: authenticity_token,
			comment: {
				notes: controller.newCommentText,
				responder_id: $scope.$parent.ctrl.responderId,
				post_id: $scope.$parent.ctrl.currentPost.id
			}
		}).
		success(function (data) {
			if (data.errors) {
				controller.error = data.errors;
				controller.message = "Error submitting comment. Please try again.";
				console.log(controller.message);
			} else {
				controller.message = "New Comment Successful!";
				controller.newCommentText = undefined;
				console.log(controller.message);
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
