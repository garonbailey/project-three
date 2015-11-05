class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :post, foreign_key: true
      t.references :responder, foreign_key: true
      t.string :status, null: false
      t.string :notes

      t.timestamps null: false
    end
  end
end
