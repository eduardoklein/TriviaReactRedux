import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import { thunkTriviaQuestions } from '../redux/actions';
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
    const hash = md5('email@pessoa.com').toString();
    const { isLoading, error } = this.props;
    if (error) return (<h1>{`Error: ${error}`}</h1>);
    if (isLoading) return <h1>Loading...</h1>;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="imagem do jogador"
          />
          <h4 data-testid="header-player-name">Nome da pessoa</h4>
          <p data-testid="header-score">0</p>
        </header>
        <main>
          <QuestionCard />
        </main>
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
