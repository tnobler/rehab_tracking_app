# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

9.times do |i|
  Property.create(
    name: "Property #{i + 1}",
    units: "Unit 1, Unit 2, Unit 3, Unit 4, Unit 5, Unit 6, Unit 7, Unit 8, Unit 9, Unit 10",
    description: "This Property has 4 units left to rehab.",
  )
end

20.times do |i|
  Unit.create(
    number: "Unit #{i + 501}",
    floor_plan: "A1",
    square_footage: 501,
    budgeted_rehab_amount: 7346.17,
    rehab_status: "Not Started"
  )
end
