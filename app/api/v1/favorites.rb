# frozen_string_literal: true

module V1
  class Favorites < Grape::API
    helpers API::HasResponse
    helpers API::Authorization

    helpers do
      params :pagination do
        optional :page, type: Integer
      end
    end

    before { authenticate! }

    desc 'Get favorites by user'
    params do
      use :pagination, default_page: 1
    end
    get '/v1/favorites' do
      query_result = current_user
                     .favorite_properties
                     .ransack
                     .result
                     .order(amount_in_cent: :asc)
                     .page(params[:page])
                     .per(8)
      response_data = {
        items: query_result,
        pagination: {
          total_pages: query_result.total_pages,
          current_page: query_result.current_page
        }
      }
      respond(data: response_data)
    end
  end
end
