import {
  NEW_REQUEST, FAILED_REQUEST, SAVE_PLAYER_INFO, SAVE_TRIVIA_QUESTIONS, GET_PLAYER_SCORE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  error: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const correctAnswerPoint = 10;

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_REQUEST:
    return { ...state, isFetching: true };
  case FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  case SAVE_PLAYER_INFO:
    return { ...state, player: { ...state.player, ...action.payload } };
  case SAVE_TRIVIA_QUESTIONS:
    return { ...state, isFetching: false, questions: action.payload };
  case GET_PLAYER_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + (
          action.payload.timer * action.payload.difficulty + correctAnswerPoint
        ),
        assertions: state.player.assertions + 1,
      },
    };
  default:
    return state;
  }
};

export default reducer;
