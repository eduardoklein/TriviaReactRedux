import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { player } = this.props;
    const hash = md5('email@pessoa.com').toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imagem do jogador"
        />
        <h4 data-testid="header-player-name">Nome da pessoa</h4>
        <p data-testid="header-score">{player.score}</p>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.trivia.player,
});

export default connect(mapStateToProps)(Header);
