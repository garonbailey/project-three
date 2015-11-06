class AddSessionTokenToResponders < ActiveRecord::Migration
  def change
    add_column :responders, :session_token, :string
  end
end
