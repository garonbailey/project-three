json.posts @posts do |post|
  json.id post.id
  json.longitude post.longitude
  json.latitude post.latitude
  json.usernotes post.usernotes
end
