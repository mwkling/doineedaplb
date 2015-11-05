class Choice < ActiveRecord::Base
  belongs_to :question

  validates :choice_text, presence: true
end
