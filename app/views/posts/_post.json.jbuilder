json.post do
  json.id @post.id
  json.latitude @post.latitude
  json.longitude @post.longitude
  json.usernotes @post.usernotes
  json.closed @post.closed
  json.created_at @post.created_at
end
