class CreateOthers < ActiveRecord::Migration[6.0]
  def change
    create_table :others do |t|
      t.string :img1
      t.string :img2

      t.timestamps
    end
  end
end
