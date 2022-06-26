Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount API::Base => "/"
  use_doorkeeper do
    skip_controllers :authorizations, :applications, :authorized_applications
  end

  devise_for :users

  root to: "properties#index"
end
