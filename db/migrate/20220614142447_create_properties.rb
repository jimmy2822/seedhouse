class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.integer :user_id
      t.string :title
      t.integer :amount_in_cent, null: false
      t.string :address_district
      t.string :address_city
      t.string :address_line
      t.string :mrt_line
      t.integer :room
      t.string :image

      t.timestamps
    end
  end
end
