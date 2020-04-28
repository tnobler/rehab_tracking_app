Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'units/index'
      post 'units/create'
      get '/show/:id', to: 'units#show'
      delete '/destroy/:id', to: 'units#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'properties/index'
      post 'properties/create'
      get '/show/:id', to: 'properties#show'
      delete '/destroy/:id', to: 'properties#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
