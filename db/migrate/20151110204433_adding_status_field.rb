class AddingStatusField < ActiveRecord::Migration
  def change
      add_column :posts, :closed, :boolean, default: false
      remove_column :comments, :status
  end
end
