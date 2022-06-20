# frozen_string_literal: true

module V1
  class Properties < Grape::API
    helpers API::HasResponse

    helpers do
      params :pagination do
        optional :page, type: Integer
      end
    end

    desc 'Properties data'
    params do
      use :pagination, default_page: 1
    end
    get '/v1/properties' do
      response_data = {
        items: Property.all.page(params[:page]).per(8)
      }

      respond(data: response_data)
    end
  end
end
