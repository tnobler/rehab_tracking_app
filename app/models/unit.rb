class Unit < ApplicationRecord
  validates :number, presence: true
  validates :floor_plan, presence: true
  validates :square_footage, presence: true
  validates :budgeted_rehab_amount, presence: true
  validates :rehab_status, presence: true
end
