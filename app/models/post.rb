class Post < ActiveRecord::Base
  validates :latitude, presence: true
  validates :longitude, presence: true

  has_many :comments, dependent: :destroy
end
