class PostsController < ApplicationController
	def new
		render 'post/new', layout: 'angular'
	end

	def index
		render 'post/index', layout: 'angular'
	end
end
