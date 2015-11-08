json.posts @posts do |post|
  json.(post, :id, :usernotes, :contactname, :contactemail, :contactphone)
  json.comments post.comments, partial: 'comments/comment', as: :comment
end
