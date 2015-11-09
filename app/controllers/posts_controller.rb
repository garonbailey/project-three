class PostsController < ApplicationController

	def new
		@post = Post.new
		render 'post/new', layout: 'angular'
	end

	def index
		@posts = Post.all
		render 'post/index', layout: 'angular'
	end


	def show
		@post = Post.find(params[:id])
		@comment = Comment.new
		@comment.post_id = @post.id
	end

	def create
		@post = Post.new(post_params)
		@post.save

		redirect_to post_path(@post)
	end

	def destroy
		@post = Post.find(params[:id])
		@post.delete

		redirect_to posts_path
	end

	def edit
		@post = Post.find(params[:id])
	end

	def update
		@post = Post.find(params[:id])
		@post.update(post_params)

		redirect_to post_path(@post)
	end

	private

	def post_params
		params.require(:post).permit(:latitude, :longitude,
		                             :usernotes, :contactname,
		                             :contactemail, :contactphone)

	end
end
