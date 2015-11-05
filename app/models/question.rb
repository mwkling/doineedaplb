class Question < ActiveRecord::Base
  has_many :choices

  validates :question_text, presence: true
end
