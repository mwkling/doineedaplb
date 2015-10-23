class SubmissionsController < ApplicationController
  def create
    @csv_response = Submission.new(submission_params)
    if @csv_response.save
      render :text => "ok"
    else
      render :text => "failed to save"
    end
  end

  private
    def submission_params
      params.permit(:csv_response)
    end
end
