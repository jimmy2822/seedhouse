# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Crypto.sha256 }

    trait :with_properties do
      property
    end

    factory :user_with_favorites do
      transient do
        favorites_count { 3 }
      end

      after(:create) do |user, evaluator|
        create_list(:favorite, evaluator.favorites_count, user: user)
      end
    end
  end
end
