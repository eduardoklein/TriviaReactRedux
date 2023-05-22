import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Game extends Component {
  render() {
    const hash = md5('email@pessoa.com').toString();
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
      </div>
    );
  }
}

export default Game;
