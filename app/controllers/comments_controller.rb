class CommentsController < ApplicationController

  def index
    @comments = Comment.all
  end

  def show
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.save
    render partial: 'comment'
  end

  def findbypost
    puts params[:id]
    num = params[:id].to_i

    @commenty = Post.all[num].comments

    respond_to do |format|
      format.json { render :json => @commenty }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:notes, :post_id, :responder_id)
  end

  def find_by_post
    params.require(:test).permit(:post_id)
  end

end
