class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :usernotes, null: false 
      t.string :contactname
      t.string :contactemail
      t.string :contactphone

      t.timestamps null: false
    end
  end
end
