json.posts @posts do |post|
  json.(post, :id, :location, :usernotes, :contactname, :contactemail, :contactphone)
  json.comments post.comments, partial: 'comments/comment', as: :comment
end
