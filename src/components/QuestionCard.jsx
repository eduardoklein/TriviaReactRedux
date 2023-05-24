import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayerScore } from '../redux/actions';
import './QuestionCard.css';

const interval = 1000;
class QuestionCard extends Component {
  state = {
    answers: [],
    timer: 30,
    index: 0,
    isNextQuestion: false,
  };

  componentDidMount() {
    const { index } = this.state;
    this.shuffleAnswers(index);
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer === 0) {
          clearInterval(this.timerInterval);
          return prevState;
        }
        return {
          timer: prevState.timer - 1,
        };
      });
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  shuffleAnswers = (index) => {
    const { questions } = this.props;
    if (questions.length) {
      const answers = [
        questions[index].correct_answer,
        ...questions[index].incorrect_answers,
      ];
      const shuffledAnswers = answers
        .map((answer) => ({ answer, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ answer }) => answer);
      this.setState({ answers: shuffledAnswers });
    }
  };

  handleClickOnAnswer = () => {
    this.setState({ isNextQuestion: true });
  };

  handleNextQuestion = () => {
    const { index } = this.state;
    const { questions, history } = this.props;
    const lastQuestionIndex = questions.length - 1;
    if (index !== lastQuestionIndex) {
      this.setState((prev) => ({
        index: prev.index + 1,
        isNextQuestion: false,
        timer: 30,
      }), this.shuffleAnswers(index + 1));
      return;
    }
    history.push('/feedback');
  };

  render() {
    const { questions, getScore } = this.props;
    if (questions.length) {
      const { timer, answers, index, isNextQuestion } = this.state;
      const { category, question, correct_answer: correct,
        difficulty } = questions[index];
      let indexCounter = 0;
      return (
        <main>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          <div data-testid="answer-options">
            {answers.map((answer) => {
              if (answer !== correct) {
                const incorrectAnswer = (
                  <button
                    key={ Math.random() }
                    data-testid={ `wrong-answer-${indexCounter}` }
                    className="wrong-answer"
                    disabled={ timer === 0 }
                    onClick={ this.handleClickOnAnswer }
                  >
                    {answer}
                  </button>
                );
                indexCounter += 1;
                return incorrectAnswer;
              }
              return (
                <button
                  key={ Math.random() }
                  data-testid="correct-answer"
                  className="correct-answer"
                  disabled={ timer === 0 }
                  onClick={ () => {
                    getScore(difficulty, timer);
                    this.handleClickOnAnswer();
                  } }
                >
                  {answer}
                </button>
              );
            })}
            {timer}
            {isNextQuestion && (
              <button
                data-testid="btn-next"
                onClick={ this.handleNextQuestion }
              >
                Next
              </button>
            )}
          </div>
        </main>
      );
    }
  }
}

QuestionCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    difficulty: PropTypes.number,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  getScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  isLoading: state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getScore: (difficulty, timer) => dispatch(getPlayerScore(difficulty, timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
