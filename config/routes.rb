Rails.application.routes.draw do
<<<<<<< HEAD

  root 'application#angular'

  get 'application/angular'

  get '/new' => 'posts#new'

  get '/' => 'posts#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
=======
  root 'application#index'

  get '/portal' => 'application#portal'
  get '/sessions' => 'sessions#current_responder', defaults: { format: :json }
  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'
>>>>>>> a757f25f2032fc79e5817a1bee9a60f6a94fdd91



  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]


end
