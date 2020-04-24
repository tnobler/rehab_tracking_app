class CreateProperties < ActiveRecord::Migration[6.0]
  def change
    create_table :properties do |t|
      t.string :name, null: false
      t.string :units, null: false
      t.text :description, null: false
      t.string :image, default: 'https://raw.githubusercontent.com/tnobler/rehab_tracking_app/master/app/assets/images/sedona_rehabbed_livingroom.jpg'

      t.timestamps
    end
  end
end
