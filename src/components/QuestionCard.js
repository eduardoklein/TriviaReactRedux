import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './QuestionCard.css';

class QuestionCard extends Component {
  shuffleAnswers = (questions, index) => {
    const answers = [
      questions[index].correct_answer,
      ...questions[index].incorrect_answers,
    ];
    return answers
      .map((answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ answer }) => answer);
  };

  render() {
    const { questions } = this.props;
    if (questions.length) {
      const index = 0;
      const { category, question, correct_answer: correct } = questions[index];
      const answers = this.shuffleAnswers(questions, index);
      let counter = 0;
      return (
        <main>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          <div data-testid="answer-options">
            {answers.map((answer) => {
              console.log(correct, answer);
              if (answer !== correct) {
                const incorrectAnswer = (
                  <button
                    key={ Math.random() }
                    data-testid={ `wrong-answer-${counter}` }
                    className="wrong-answer"
                  >
                    {answer}
                  </button>
                );
                counter += 1;
                return incorrectAnswer;
              }
              return (
                <button
                  key={ Math.random() }
                  data-testid="correct-answer"
                  className="correct-answer"
                >
                  {answer}
                </button>
              );
            })}
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
});

export default connect(mapStateToProps)(QuestionCard);
