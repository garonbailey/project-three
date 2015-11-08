json.post do
  json.id @post.id
  json.latitude @post.latitude
  json.longitude @post.longitude
  json.usernotes @post.usernotes
  json.contactname @post.contactname
  json.contactemail @post.contactemail
  json.contactphone @post.contactphone
  json.created_at @post.created_at
  json.updated_at @post.updated_at
end
