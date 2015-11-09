Rails.application.routes.draw do

  root 'application#angular'

  get 'application/angular'

  get '/' => 'posts#new'

  get '/login' => 'session#new'

  get '/reports' => 'posts#index'

  get '/closed' => 'posts#closed'


  get 'index' => 'application#index'

  post 'posts/create' => 'posts#create'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
<<<<<<< HEAD

  get '/portal' => 'application#portal'
  get '/session' => 'session#current_responder', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'


=======


  get '/portal' => 'application#portal'
  get '/sessions' => 'sessions#current_responder', defaults: { format: :json }
  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'
>>>>>>> cff23ed9a423ad617e30761797904dcc718c7686


  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]

end
