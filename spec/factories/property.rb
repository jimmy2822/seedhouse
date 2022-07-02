# frozen_string_literal: true

FactoryBot.define do
  factory :property do
    title { Faker::Books::Lovecraft.location }
    address_city { Faker::Address.city }
    address_district { Faker::Address.street_address }
    address_line { Faker::Address.full_address }
    amount_in_cent { Faker::Currency.rand_in_range(1, 90_000) }
    room { Faker::Number.rand_in_range(1, 10) }
    mrt_line { Faker::Color.color_name }
  end
end
