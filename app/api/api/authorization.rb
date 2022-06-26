# frozen_string_literal: true

module API
  module Authorization
    def current_user
      env['warden'].authenticate(scope: :user)
    end
  end
end
