class CreateRounds < ActiveRecord::Migration[6.0]
  def change
    create_table :rounds do |t|
      t.integer :score
      t.integer :strike, :default => 0
      t.integer :streak, :default => 0
      
      t.timestamps
    end
  end
end
