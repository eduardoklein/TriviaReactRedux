import {
  NEW_REQUEST, FAILED_REQUEST, SAVE_TRIVIA_QUESTIONS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  error: '',
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_REQUEST:
    return { ...state, isFetching: true };
  case FAILED_REQUEST:
    return { ...state, isFetching: false, error: action.payload };
  case SAVE_TRIVIA_QUESTIONS:
    return { ...state, isFetching: false, questions: action.payload };
  default:
    return state;
  }
};

export default trivia;
