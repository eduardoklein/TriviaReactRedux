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

  // onLoginButtonClick = () => {
  //   const { history, dispatch } = this.props;
  //   const { email } = this.state;
  //   dispatch(saveLogin(email));
  //   history.push('/');
  // };

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
            // onClick={ (event) => {
            //   this.onLoginButtonClick();
            //   event.preventDefault();
            // } }
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
