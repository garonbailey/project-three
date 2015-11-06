class ChangeColumnInResponders < ActiveRecord::Migration
  def change
    rename_column :responders, :password, :password_digest
    change_column_null :responders, :password_digest, false
  end
end
