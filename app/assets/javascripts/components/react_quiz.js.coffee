# @cjsx React.DOM

@ReactQuiz = React.createClass(
  getInitialState: ->
    questions: []
    questionIndex: 0

  componentDidMount: ->
    @_fetchQuestions()

  _fetchQuestions: ->
    $.ajax
      url: "/questions.json"
      dataType: 'json'
    .done @_fetchDataDone
    .fail @_fetchDataFail

  _fetchDataDone: (data, textStatus, jqXHR) ->
    @setState questions: data

  _fetchDataFail: ->
    console.error "failed to fetch questions"

  nextClick: ->
    @setState questionIndex: Math.min(@state.questionIndex + 1, @state.questions.length - 1)
  previousClick: ->
    @setState questionIndex: Math.max(0, @state.questionIndex - 1)

  render: ->
    console.log @state

    if @state.questions.length > 0
      currentQuestion = @state.questions[@state.questionIndex]
      customStyle = {marginTop: "10px"}
      questionsNode = currentQuestion.choices.map (choice, index) ->
        <label className="btn btn-primary">
          <div>{ choice.choice_text }</div>
        </label>

      buttonNode =
       <div className="row" style={customStyle}>
            <div className="col-md-5"></div>
            {
              if @state.questionIndex != 0
                <div className="col-xs-6 col-md-2"><button type="button" className="btn btn-success btn-block previous" onClick={@previousClick}>Previous</button></div>
            }
            {
              if @state.questionIndex != @state.questions.length - 1
                <div className="col-md-2"><button type="button" className="btn btn-success btn-block next" onClick={@nextClick}>Next</button></div>
            }
            <div className="col-md-5"></div>
        </div>

      <div id="firstQuestion" className="questionContainer fade in" data-name="q1">
          <h3>{"Question " + @state.questionIndex + 1 + "/" + @state.questions.length}</h3>
          <div className="well">
            <p>{ currentQuestion.question_text }</p>
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
    else
      <div>Loading ... </div>
)
