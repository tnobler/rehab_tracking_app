class CreateUnits < ActiveRecord::Migration[6.0]
  def change
    create_table :units do |t|
      t.string :number, null: false
      t.string :floor_plan, null: false
      t.integer :square_footage, null: false
      t.decimal :budgeted_rehab_amount, null: false
      t.string :rehab_status, null: false, default: 'Not Started'
      #Ex:- :default =>''

      t.timestamps
    end
  end
end
