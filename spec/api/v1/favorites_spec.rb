require 'rails_helper'

RSpec.describe V1::Favorites do
  let(:current_user) { create(:user) }
  let(:access_token) do
    Doorkeeper::AccessToken.create(resource_owner_id: current_user.id).token
  end

  describe 'GET /api/v1/favorites' do
    describe 'Has Authentication' do
      it 'respond 401 without authorization token' do
        get('/api/v1/favorites')
        expect(response.status).to eq(401)
      end

      it 'respond 200 with authorization token' do
        get '/api/v1/favorites', headers: { Authorization: access_token }
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'POST /api/v1/favorites' do
    describe 'Has Authentication' do
      it 'respond 401 without authorization token' do
        post '/api/v1/favorites'
        expect(response.status).to eq(401)
      end

      it 'respond 200 with authorization token' do
        post '/api/v1/favorites', headers: { Authorization: access_token }
        expect(response.status).to eq(201)
      end
    end
  end

  describe 'DELETE /api/v1/favorites' do
    describe 'Has Authentication' do
      it 'respond 401 without authorization token' do
        delete '/api/v1/favorites'
        expect(response.status).to eq(401)
      end

      it 'respond 200 with authorization token' do
        delete '/api/v1/favorites', headers: { Authorization: access_token }
        expect(response.status).to eq(200)
      end
    end
  end
end
