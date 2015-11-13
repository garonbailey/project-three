json.comment do
  json.id @comment.id
  json.responder_id @comment.responder_id
  json.notes @comment.notes
  json.post_id @comment.post_id
  json.created_at @comment.created_at
  json.updated_at @comment.updated_at
end
