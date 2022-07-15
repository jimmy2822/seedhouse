# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::Favorites do
  let(:current_user) { create(:user_with_favorites) }
  let(:access_token) do
    Doorkeeper::AccessToken.create(resource_owner_id: current_user.id).token
  end

  describe 'GET /api/v1/favorites' do
    describe 'Has Authentication' do
      it 'responds 401 without authorization token' do
        get('/api/v1/favorites')
        expect(response.status).to eq(401)
      end

      it 'responds 200 with authorization token' do
        get '/api/v1/favorites', headers: { Authorization: access_token }
        expect(response.status).to eq(200)
      end
    end

    describe 'Response includes data' do
      subject { get '/api/v1/favorites', headers: { Authorization: access_token } }
      before { subject }

      it 'responds current user favorite properties amount' do
        expect(JSON.parse(response.body)['data']['items'].count).to eq(3)
      end

      it 'responds current user favorite properties content' do
        expect(JSON.parse(response.body)['data']['items'].map { |item| item['id'] })
          .to eq(current_user.favorite_properties.pluck(:id))
      end
    end
  end

  describe 'POST /api/v1/favorites' do
    describe 'Has Authentication' do
      it 'responds 401 without authorization token' do
        post '/api/v1/favorites'
        expect(response.status).to eq(401)
      end

      it 'responds 201 with authorization token' do
        post '/api/v1/favorites', headers: { Authorization: access_token }
        expect(response.status).to eq(201)
      end
    end

    describe 'Response data' do
      let(:property) { create(:property) }

      context 'Adding a property' do
        it 'responds the latest current user favorite_property_ids after success' do
          post '/api/v1/favorites', headers: { Authorization: access_token }, params: { property_id: property.id }
          expect(JSON.parse(response.body)['data']['favorite_property_ids'])
            .to eq(current_user.favorite_properties.pluck(:id))
        end

        it 'after success the amount of favorites should be 4' do
          post '/api/v1/favorites', headers: { Authorization: access_token }, params: { property_id: property.id }
          expect(JSON.parse(response.body)['data']['favorite_property_ids'].count).to eq(4)
        end
      end
    end
  end

  describe 'DELETE /api/v1/favorites' do
    describe 'Has Authentication' do
      it 'responds 401 without authorization token' do
        delete '/api/v1/favorites'
        expect(response.status).to eq(401)
      end

      it 'responds 200 with authorization token' do
        delete '/api/v1/favorites', headers: { Authorization: access_token }
        expect(response.status).to eq(200)
      end
    end

    describe 'Delete a favorite' do
      it 'after delete success the amount of favorites should be 2' do
        delete '/api/v1/favorites', headers: { Authorization: access_token },
                                    params: { property_id: current_user.favorite_properties.first.id }
        expect(JSON.parse(response.body)['data']['favorite_property_ids'].count).to eq(2)
      end
    end
  end
end
