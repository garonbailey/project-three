json.posts @posts do |post|
  json.id post.id
<<<<<<< HEAD
  json.longitude post.longitude
  json.latitude post.latitude
=======
  json.latitude post.latitude
  json.longitude post.longitude
>>>>>>> 13102d9cdc4b999d4489d31ffc417fd4688f4e78
  json.usernotes post.usernotes
end
