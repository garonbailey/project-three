Rails.application.routes.draw do

  root 'application#angular'

  get 'application/angular'

  get '/new' => 'posts#new'

  get '/' => 'posts#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".


  get '/portal' => 'application#portal'
  get '/sessions' => 'sessions#current_responder', defaults: { format: :json }
  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'



  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]


end
