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

    render partial: 'comment', layout:false
  end

  private

  def comment_params
    params.require(:comment).permit(:notes, :post_id)
  end
end