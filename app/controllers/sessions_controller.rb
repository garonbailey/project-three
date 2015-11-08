class SessionsController < ApplicationController
  def new
  end

  def create
    responder = Responder.find_by username: session_params[:username]

    if responder && responder.authenticate(session_params[:password])

      token = SecureRandom.urlsafe_base64
      session[:session_token] = token
      responder.update(session_token: token)

      # render json: { token: generated_token }

      redirect_to posts_path
    else
      redirect_to :back
    end
  end

  def destroy
    log_out!

    redirect_to root_path
  end

  def current_responder

  end


  private

  def session_params
    params.require(:session).permit(:username, :password)
  end
end
