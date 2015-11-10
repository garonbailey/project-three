json.posts @posts do |post|
  json.id post.id
<<<<<<< HEAD
  json.latitude post.latitude
  json.longitude post.longitude
=======
  json.longitude post.longitude
  json.latitude post.latitude
>>>>>>> 4335730bc70589a7e70168e70860294dbdf986c9
  json.usernotes post.usernotes
end
