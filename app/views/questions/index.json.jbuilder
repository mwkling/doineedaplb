json.array!(@questions) do |question|
  json.set! :id, question.id
  json.set! :question_text, question.question_text

  json.choices do
    json.array!(question.choices) do |choice|
      json.set! :id, choice.id
      json.set! :choice_text, choice.choice_text
      json.set! :question_id, choice.question_id
    end
  end
end
