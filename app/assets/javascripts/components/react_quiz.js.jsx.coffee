# @cjsx React.DOM

@ReactQuiz = React.createClass(
  getInitialState: ->
    questions: [{text: "You are looking for:", answers: ["A handheld device", "Mounted to a boat", "Mounted to a plane"]}]
  render: ->
    currentQuestion = @state.questions[0]
    `<div id="firstQuestion" className="questionContainer fade in" data-name="q1">
        <h3>Question 1/5</h3>
        <div className="well">
        <p>{ currentQuestion.text }</p>
        <div className="btn-group-vertical" data-toggle="buttons"> 
              if currentQuestion.answers.length > 0
                currentQuestion.answers.map (answer, index) ->  
                  console.log answer
                  <label className="btn btn-primary">
                    <div>{answer}</div>
                  </label>
        </div>

        <div className="row" style={{marginTop: "10px"}}>
            <div className="col-md-5"></div>
            <div className="col-md-2"><button type="button" className="btn btn-success btn-block next">Next</button></div>
            <div className="col-md-5"></div>
        </div>

        </div>
    </div>`
)
