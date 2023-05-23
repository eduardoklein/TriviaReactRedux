import {
  NEW_REQUEST,
  FAILED_REQUEST,
  SAVE_TRIVIA_QUESTIONS,
  GET_PLAYER_SCORE,
  UPDATE_SCORE,
} from './actionTypes';

export const newRequest = () => ({ type: NEW_REQUEST });
export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error.message,
});
export const saveTriviaQuestions = (questions) => ({
  type: SAVE_TRIVIA_QUESTIONS,
  payload: questions,
});

export const getPlayerScore = (difficulty) => ({
  type: GET_PLAYER_SCORE,
  difficulty,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const thunkTriviaQuestions = () => async (dispatch) => {
  try {
    dispatch(newRequest());
    const token = localStorage.getItem('token');
    const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(API_URL);
    const data = await request.json();
    if (!data.results.length) localStorage.removeItem('token');
    const mapPoints = data.results.map((element) => {
      switch (element.difficulty) {
      case 'easy':
        element.difficulty = 1;
        break;
      case 'medium':
        element.difficulty = 2;
        break;
      default:
        element.difficulty = 3;
      } return element;
    });
    // dispatch(mapPoints);
    dispatch(saveTriviaQuestions(mapPoints));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
