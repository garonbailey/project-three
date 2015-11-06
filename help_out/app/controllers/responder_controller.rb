class ResponderController < ApplicationController
  def new
    @responder = Responder.new
  end

  def create
    @responder = Responder.new(responder_params)
    if @responder.save
      session[:responder_id] = @responder.id
      redirect_to new_session_path
    else
      redirect_to root_path
    end
  end

  private

  def responder_params
    return params.require(:responder).permit(:username, :password, :password_confirmation)
  end
end
