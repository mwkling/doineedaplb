class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.string :csv_response

      t.timestamps null: false
    end
  end
end
