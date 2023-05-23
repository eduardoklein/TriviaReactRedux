import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayerScore, updateScore } from '../redux/actions';
import './QuestionCard.css';

const interval = 1000;
class QuestionCard extends Component {
  state = {
    answers: [],
    timer: 30,
  };

  componentDidMount() {
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
    this.shuffleAnswers();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  timerInterval = () => setInterval(() => {
    this.setState((prevState) => ({
      timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
    }));
  }, interval);

  shuffleAnswers = () => {
    const { questions } = this.props;
    if (questions.length) {
      const answers = [
        questions[0].correct_answer,
        ...questions[0].incorrect_answers,
      ];
      const shuffledAnswers = answers
        .map((answer) => ({ answer, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ answer }) => answer);
      this.setState({ answers: shuffledAnswers });
    }
  };

  handleCorrectAnswer = () => {

  };

  render() {
    const { questions, getPlayerScoreDispatched } = this.props;
    if (questions.length) {
      const { timer, answers } = this.state;
      const index = 0;
      console.log(questions[0]);
      const { category,
        question,
        correct_answer: correct,
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
                  onClick={ this.handleCorrectAnswer }
                >
                  {answer}
                </button>
              );
            })}
            {timer}
          </div>
        </main>
      );
    }
  }
}
QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    difficulty: PropTypes.number,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  getPlayerScoreDispatched: PropTypes.func.isRequired,
};
const mapStateToProps = ({ trivia }) => ({
  questions: trivia.questions,
  isLoading: trivia.isFetching,
});
const mapDispatchToProps = (dispatch) => ({
  getPlayerScoreDispatched: (difficulty) => dispatch(getPlayerScore(difficulty)),
  updateScoreDispatched: (score) => dispatch(updateScore(score)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
