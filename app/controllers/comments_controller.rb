class CommentsController < ApplicationController

  def new
    @comment = Comment.new  
  end

  def index
    @comments = Comment.all
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.save

    render 'posts/show', layout: 'angular'
  end

  def findbypost
    puts params[:id]
    num = params[:id].to_i

    @commenty = Post.all[num].comments
    puts "---------------------------"
    puts @commenty

    respond_to do |format|
      format.json { render :json => @commenty }
    end
    # @post_comments = Comment.find(params[:post_id])

    # render 'posts/show', layout: 'angular'
  end

  private

  def comment_params
    params.require(:comment).permit(:notes, :post_id, :responder_id)
  end

  def find_by_post
    params.require(:test).permit(:post_id)
  end

end