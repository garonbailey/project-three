Rails.application.routes.draw do

  root 'application#angular'


  get '/login' => 'application#login'
  get '/logout' => 'session#destroy'

  get 'application/angular'

  get '/' => 'posts#new'

  get '/posts' => 'posts#index'

  get '/closed' => 'posts#closed'

  get '/posts/:id' => 'posts#show'


  get 'index' => 'application#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  get '/session' => 'session#current_responder', defaults: { format: :json }
  post '/session' => 'session#create'
  delete '/session' => 'session#destroy'

  get '/comments_all/:id' => 'comments#findbypost', defaults: { format: :json }


  resources :posts, defaults: { format: :json }, only: :create

  resources :posts, except: :create

  resources :responders, only: [:create]
  resources :comments, defaults: { format: :json }, only: :create

end
