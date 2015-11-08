Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/index'
  get 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'
  get 'index' => 'application#index'

  resources :posts
  resources :responders
  resources :comments, only: [:create]

end
