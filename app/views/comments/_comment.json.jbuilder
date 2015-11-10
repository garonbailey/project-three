json.comment do
  json.id @comment.id
  json.responder_id @comment.responder_id
  json.notes @comment.notes
  json.created_at @comment.created_at
  json.updated_at @post.updated_at
end
