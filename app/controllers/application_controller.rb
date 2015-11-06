class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  helper_method :current_responder

  def index
    puts "https://maps.googleapis.com/maps/api/js?key=" + ENV['GOOGLE_MAP'] + "&callback=initMap"


    puts "some garbages"

    @map_url = "https://maps.googleapis.com/maps/api/js?key=" + ENV['GOOGLE_MAP'] + "&callback=initMap"

    render '/index'
  end

  def welcome
    render html: "I am up and running!"
  end

  private

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
