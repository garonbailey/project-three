json.posts @posts do |post|
  json.id post.id
  json.latitude post.latitude
  json.longitude post.longitude
  json.usernotes post.usernotes
end
