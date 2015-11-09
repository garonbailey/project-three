Rails.application.routes.draw do

  root 'application#angular'

  get 'application/angular'

  get '/' => 'posts#new'

  get '/login' => 'session#new'

  get '/reports' => 'posts#index'

  get '/closed' => 'posts#closed'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  get '/portal' => 'application#portal'
  get '/session' => 'session#current_responder', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'




  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]


end
