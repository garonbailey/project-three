if current_responder
  json.current_responder do
    json.id current_responder.id
  end
else
  json.current_responder nil
end
