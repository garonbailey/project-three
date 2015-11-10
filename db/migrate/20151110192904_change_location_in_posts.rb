class ChangeLocationInPosts < ActiveRecord::Migration
  def change
    rename_column :posts, :location, :latitude
    add_column :posts, :longitude, :float
  end
end
