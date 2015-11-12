class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create
  before_action :require_current_responder

	def new
		@post = Post.new
		puts "https://maps.googleapis.com/maps/api/js?key=" + ENV['GOOGLE_MAP'] + "&callback=initMap"

	    @map_url = "https://maps.googleapis.com/maps/api/js?key=" + ENV['GOOGLE_MAP'] + "&callback=initMap"
		render 'posts/new', layout: 'angular'
	end

	def index
		@posts = Post.all
		render 'posts/index', layout: 'angular'
	end

	def closed
		render 'posts/closed', layout: 'angular'
	end


	def show
		@post = Post.find(params[:id])
		@comment = Comment.new
		@comment.post_id = @post.id

		render 'posts/show', layout: 'angular'
	end

	def create
		@post = Post.new(post_params)
		@post.save

		render partial: 'post', layout: false
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
		                             :contactemail, :contactphone, :created_at)

	end

  def current_responder
    if session[:session_token]
      @current_responder ||= Responder.find_by(session_token: session[:session_token])
    else
      @current_responder = nil
    end
  end

  def log_out!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_responder
  end

  def require_current_responder
    redirect_to root_path unless logged_in?
  end
end
