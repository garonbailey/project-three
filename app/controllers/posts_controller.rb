class PostsController < ApplicationController

  def create
    @post = Post.new(post_params)
    @post.save
  end

  def post_params
    return params.require(:post).permit(:description, :latitude, :longitude)

	def new
		@post = Post.new
		puts "https://maps.googleapis.com/maps/api/js?key=" + ENV['GOOGLE_MAP'] + "&callback=initMap"

	    @map_url = "https://maps.googleapis.com/maps/api/js?key=" + ENV['GOOGLE_MAP'] + "&callback=initMap"
		render 'post/new', layout: 'angular'
	end

	def index
		# @posts = Post.all
		render 'post/index', layout: 'angular'
	end

	def closed
		render 'post/closed', layout: 'angular'
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
