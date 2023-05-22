import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  state = {
    username: '',
    email: '',
    isButtonDisabled: true,
  };

  validationUserAndEmail = () => {
    const {
      email,
      username,
    } = this.state;
    const minCharacter = 1;
    const valUsername = username.length >= minCharacter;
    const valEmail = email.length >= minCharacter;

    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // const valEmail = emailRegex.test(email);

    this.setState({
      isButtonDisabled: !(valUsername && valEmail),
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationUserAndEmail);
  };

  fetchTrivaToken = async () => {
    const API_URL = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(API_URL);
    const data = await request.json();
    const { token } = data;

    localStorage.setItem('token', token);
  };

  onLoginButtonClick = async () => {
    const { history } = this.props;
    await this.fetchTrivaToken();
    history.push('/game');
  };

  render() {
    const {
      username,
      email,
      isButtonDisabled,
    } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="player-input">
            Username
            <input
              data-testid="input-player-name"
              type="text"
              name="username"
              id="player-input"
              onChange={ this.onInputChange }
              value={ username }
            />
          </label>
          <label htmlFor="email-input">
            email
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              id="email-input"
              onChange={ this.onInputChange }
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.onLoginButtonClick }
            disabled={ isButtonDisabled }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

// export default connect(mapStateToProps)(Login);

export default connect()(withRouter(Login));
