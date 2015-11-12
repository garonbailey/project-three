json.comments @comments do |comment|
  json.id comment.id
  json.responder_id post.responder_id
  json.notes comment.notes
  json.post_id post.post_id
  json.created_at comment.created_at
  json.updated_at comment.updated_at
end
