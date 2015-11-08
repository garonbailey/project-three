Rails.application.routes.draw do
  root 'application#index'

  get '/portal' => 'application#portal'
  get '/sessions' => 'sessions#current_responder', defaults: { format: :json }
  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'



  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]


end
