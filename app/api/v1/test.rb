# frozen_string_literal: true

module V1
  class Test < Grape::API
    desc 'Test API'
    get 'v1/test' do
      'Test success!!!!'
    end
  end
end
