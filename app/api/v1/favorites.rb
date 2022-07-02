# frozen_string_literal: true

module V1
  class Favorites < Grape::API
    helpers API::HasResponse
    helpers API::Authorization

    before { authenticate! }

    desc 'Get favorites by user'
    get 'v1/favorites' do
      query_result = current_user
                     .favorite_properties
                     .order(id: :asc)
      response_data = {
        items: query_result
      }

      respond(data: response_data)
    end

    desc 'Create favorites by user'
    post 'v1/favorites' do
      favorite = current_user.favorites.find_or_create_by(property_id: params[:property_id])
      user_favorite_property_ids = current_user.favorites.pluck(:property_id)

      response_data = {
        favorite_property_ids: user_favorite_property_ids,
        message: favorite ? 'success' : 'failed to create'
      }

      respond(data: response_data)
    end

    desc 'Delete favorites by user'
    delete 'v1/favorites' do
      destroyed_list = current_user.favorites.destroy_by(property_id: params[:property_id])
      user_favorite_property_ids = current_user.favorites.pluck(:property_id)

      response_data = {
        favorite_property_ids: user_favorite_property_ids,
        message: destroyed_list.present? ? 'success' : 'favorite dose not exist'
      }

      respond(data: response_data)
    end
  end
end
