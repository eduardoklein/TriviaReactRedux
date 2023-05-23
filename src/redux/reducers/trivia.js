import {
  NEW_REQUEST, FAILED_REQUEST, SAVE_TRIVIA_QUESTIONS, GET_PLAYER_SCORE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  error: '',
  player: {
    // name: nome-da-pessoa,
    // assertions: número-de-acertos,
    score: 0,
    // gravatarEmail: email-da-pessoa,
  },
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_REQUEST:
    return { ...state, isFetching: true };
  case FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  case SAVE_TRIVIA_QUESTIONS:
    return { ...state, isFetching: false, questions: action.payload };
  case GET_PLAYER_SCORE:
    return { ...state, player: { ...state.player, score: action.score } };
  default:
    return state;
  }
};

export default trivia;
