# frozen_string_literal: true

module API
  module HasResponse
    def respond(data:, error: nil)
      return respond_failure(error) if error

      respond_success(data)
    end

    def respond_success(data)
      {
        return_status: {
          code: 200,
          message: 'success'
        },
        data: data
      }
    end

    def respond_failure(error)
      {
        return_status: {
          code: error.code,
          message: error.error_message
        }
      }
    end
  end
end
