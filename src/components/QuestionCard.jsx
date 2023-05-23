import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.timerInterval();
    this.shuffleAnswers(index);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  timerInterval = () => {
    const { timer } = this.state;
    if (timer > 0) {
      setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer > 0 ? prevState.timer - 1 : 0,
        }));
      }, interval);
    }
  };

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
    this.setState((prev) => ({
      index: prev.index + 1,
      isNextQuestion: false,
    }), this.shuffleAnswers(index + 1));
  };

  render() {
    const { questions } = this.props;
    if (questions.length) {
      const { timer, answers, index, isNextQuestion } = this.state;
      const { category, question, correct_answer: correct } = questions[index];
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
                  onClick={ this.handleClickOnAnswer }
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
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

const mapStateToProps = ({ trivia }) => ({
  questions: trivia.questions,
  isLoading: trivia.isFetching,
});

export default connect(mapStateToProps)(QuestionCard);
