class CreateTableFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.integer :user_id, index: true
      t.integer :property_id, index: true

      t.timestamps
    end
  end
end
