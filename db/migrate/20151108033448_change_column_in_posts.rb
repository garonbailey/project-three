class ChangeColumnInPosts < ActiveRecord::Migration
  def change
    rename_column :posts, :longitude, :location
  end
end
