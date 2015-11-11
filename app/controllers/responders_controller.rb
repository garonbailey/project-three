class RespondersController < ApplicationController
  def index
    @responders = Responder.all
  end

  def show
  end

  def new
  end

  def create
    @responder = Responder.new(responder_params)
    if @responder.save
      session[:responder_id] = @responder.id
      redirect_to login_path
    else
      redirect_to login_path
    end
  end

  def destroy
  end

  def edit
  end

  def update
  end

  private

  def responder_params
    return params.require(:responder).permit(:username, :password, :password_confirmation)
  end
end
