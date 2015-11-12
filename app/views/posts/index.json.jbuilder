json.posts @posts do |post|
  json.id post.id
  json.latitude post.latitude
  json.longitude post.longitude
  json.usernotes post.usernotes
  json.closed    post.closed
  json.created_at time_ago_in_words(post.created_at) + " ago"
  json.contactname post.contactname
  json.contactemail post.contactemail
  json.contactphone post.contactphone

  json.comments post.comments, partial: 'comments/comment', as: :comment
end
