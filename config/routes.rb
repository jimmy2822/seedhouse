Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount API::Base => "/"

  devise_for :users

  root "properties#index"
end
