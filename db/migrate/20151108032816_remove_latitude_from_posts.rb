class RemoveLatitudeFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :latitude, :float
  end
end
