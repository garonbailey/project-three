json.post do
  json.id @post.id
  json.location @post.location
  json.usernotes @post.usernotes
  json.contactname @post.contactname
  json.contactemail @post.contactemail
  json.contactphone @post.contactphone
  json.comments @post.comments, partial: 'comments/comment', as: :comment
end
