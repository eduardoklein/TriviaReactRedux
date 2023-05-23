import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { thunkTriviaQuestions } from '../redux/actions';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  async componentDidMount() {
    const { fetchTriviaQuestions } = this.props;
    await fetchTriviaQuestions();
    if (!localStorage.getItem('token')) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { isLoading, error } = this.props;
    if (error) return (<h1>{`Error: ${error}`}</h1>);
    if (isLoading) return <h1>Loading...</h1>;
    return (
      <div>
        <Header />
        <QuestionCard />
      </div>
    );
  }
}

Game.propTypes = {
  error: PropTypes.string.isRequired,
  fetchTriviaQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ trivia }) => ({
  questions: trivia.questions,
  isLoading: trivia.isFetching,
  error: trivia.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: () => dispatch(thunkTriviaQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
