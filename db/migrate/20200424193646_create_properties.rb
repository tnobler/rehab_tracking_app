class CreateProperties < ActiveRecord::Migration[6.0]
  def change
    create_table :properties do |t|
      t.string :name, null: false
      t.string :units, null: false
      t.text :description, null: false
      t.string :image, default: ''

      t.timestamps
    end
  end
end
