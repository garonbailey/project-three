class PostsController < ApplicationController

  def create
    @post = Post.new(post_params)
    @post.save
  end

  def post_params
    return params.require(:post).permit(:description, :latitude, :longitude)

end
