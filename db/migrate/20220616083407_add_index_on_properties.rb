class AddIndexOnProperties < ActiveRecord::Migration[7.0]
  def change
    add_index :properties, :title, unique: true
    add_index :properties, :address_district
  end
end
