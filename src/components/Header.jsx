import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { score, gravatarEmail, name } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="imagem do jogador"
        />
        <h4 data-testid="header-player-name">{name}</h4>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
