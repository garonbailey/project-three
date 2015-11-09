class SessionController < ApplicationController
  def new
    render 'session/login', layout: 'angular'
  end

  def create
    responder = Responder.find_by username: responder_params[:username]

    if responder && responder.authenticate(responder_params[:password])

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

    redirect_to portal_path
  end

  def current_responder

  end


  private

  def responder_params
    params.require(:responder).permit(:username, :password)
  end
end
