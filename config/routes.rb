Rails.application.routes.draw do
  root 'application#index'

  get '/portal' => 'application#portal'


  resources :sessions, only: [:create, :destroy]
  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]


end
