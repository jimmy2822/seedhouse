# frozen_string_literal: true

module API
  module Authorization
    def authenticate!
      error!('Not authorized!', 401) unless current_user
    end

    def current_user
      @current_user ||= User.find(Doorkeeper::AccessToken.by_token(access_token).resource_owner_id)
    end

    def access_token
      request.headers['Authorization']
    end
  end
end
