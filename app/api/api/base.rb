# frozen_string_literal: true

module API
  class Base < Grape::API
    prefix '/api'
    format :json

    mount V1::Properties
    mount V1::Favorites
  end
end
