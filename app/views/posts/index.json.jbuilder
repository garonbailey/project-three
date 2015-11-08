json.posts @posts do |post|
  json.id post.id
  json.usernotes post.usernotes
  json.comments post.comments, partial: 'comments/comment', as: comment
  json.contactname post.contactname
  json.contactemail post.contactemail
  json.contactphone post.contactphone
end
