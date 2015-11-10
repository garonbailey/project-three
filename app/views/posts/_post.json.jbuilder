json.post do
  json.id @post.id
  json.location @post.location
  json.usernotes @post.usernotes
end
