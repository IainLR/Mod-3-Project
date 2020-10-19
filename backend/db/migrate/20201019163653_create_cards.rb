class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :img1
      t.string :img2

      t.timestamps
    end
  end
end
