class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)

    @comment.save

    redirect_to post_path(@comment.post)
  end

  private

  def comment_params
    params.require(:comment).permit(:notes, :post_id)
  end
end