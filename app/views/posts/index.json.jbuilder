json.posts @posts do |post|
  json.id post.id
  json.latitude post.latitude
  json.longitude post.longitude
  json.usernotes post.usernotes

  json.comments post.comments, partial: 'comment/comment', as: :comment
end
