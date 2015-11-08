Rails.application.routes.draw do
  root 'application#welcome'

  get 'application/index'
  get 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'

  resources :posts
  resources :responders, only: [:create]
  resources :comments, only: [:create]

end
