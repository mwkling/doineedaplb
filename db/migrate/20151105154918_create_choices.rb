class CreateChoices < ActiveRecord::Migration
  def change
    create_table :choices do |t|
      t.text :choice_text
      t.references :question, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
