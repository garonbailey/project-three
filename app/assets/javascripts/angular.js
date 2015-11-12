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
		evtMap.setOptions({'scrollwheel': false});
    $scope.placeMarker = function(e) {
      var marker = new google.maps.Marker({position: e.latLng, map: map});
      map.panTo(e.latLng);
			controller.lat = marker.position.lat();
			controller.lng = marker.position.lng();
    }
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
	var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	var controller = this;
	controller.createComment = function () {
		$http.post('/comments', {
			// authenticity_token: authenticity_token,
			comment: {
				notes: controller.newCommentText,
				responder_id: 6
				// post_id: $scope.$parent.post.id
			}
		}).
		success(function (data) {
			if (data.errors) {
				controller.error = data.errors;
				controller.message = "Error submitting comment. Please try again.";
				console.log($scope.$parent);
				console.log(controller.message);
			} else {
				controller.message = "New Comment Successful!";
				controller.newCommentText = undefined;
				console.log($scope.$parent);
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
