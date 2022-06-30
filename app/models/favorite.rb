# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :property

  validates :user_id, :property_id, presence: true
end
