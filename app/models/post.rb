class Post < ActiveRecord::Base

validates :location, presence: true

has_many :comments, dependent: :destroy

end
