# @cjsx React.DOM

@ReactQuiz = React.createClass(
  getInitialState: ->
    questions: [{text: "You are looking for:", answers: ["A handheld device that will be activated manually in an emergency.", "Device mounted to a boat that activates automatically in an emergency.", "Device mounted to a plane that activates automatically in an emergency."]}, {text: "Second question:", answers: ["1", "Device mounted to a boat that activates automatically in an emergency.", "Device mounted to a plane that activates automatically in an emergency."]}]
  render: ->
    currentQuestion = @state.questions[0]
    customStyle = {marginTop: "10px"}
    questionsNode = currentQuestion.answers.map (answer, index) ->
      <label className="btn btn-primary">
        <div>{ answer }</div>
      </label>

    buttonNode =
     <div className="row" style={customStyle}>
          <div className="col-md-5"></div>
          {
            if @state.currentQuestionIndex != 0
              <div className="col-xs-6 col-md-2"><button type="button" className="btn btn-success btn-block previous" onClick={@previousClick}>Previous</button></div>
            if @state.currentQuestionIndex != @state.questions.length - 1
              <div className="col-md-2"><button type="button" className="btn btn-success btn-block next" onClick={@nextClick}>Next</button></div>
          }
          <div className="col-md-5"></div>
      </div>

    <div id="firstQuestion" className="questionContainer fade in" data-name="q1">
        <h3>Question 1/5</h3>
        <div className="well">
          <p>{ currentQuestion.text }</p>
          <div className="btn-group-vertical" data-toggle="buttons">
            {questionsNode}
          </div>

          <div className="row" style={customStyle}>
              <div className="col-md-5"></div>
              {buttonNode}
              <div className="col-md-5"></div>
          </div>
        </div>
    </div>
)
