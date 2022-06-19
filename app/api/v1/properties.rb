# frozen_string_literal: true

module V1
  class Properties < Grape::API
    include API::HasResponse

    helpers API::HasResponse

    desc 'Properties data'

    get '/v1/properties' do
      response_data = {
        items: Property.take(10)
      }

      respond(data: response_data)
    end

    private

    def page
      params[:page] || 1
    end
  end
end
