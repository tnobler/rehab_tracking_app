class Property < ApplicationRecord
  validates :name, presence: true
  validates :units, presence: true
  validates :description, presence: true
end
