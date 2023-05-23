import { NEW_REQUEST, FAILED_REQUEST, SAVE_TRIVIA_QUESTIONS } from './actionTypes';

export const newRequest = () => ({ type: NEW_REQUEST });
export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error.message,
});
export const saveTriviaQuestions = (questions) => ({
  type: SAVE_TRIVIA_QUESTIONS,
  payload: questions,
});

export const thunkTriviaQuestions = () => async (dispatch) => {
  try {
    dispatch(newRequest());
    const token = localStorage.getItem('token');
    const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(API_URL);
    const data = await request.json();
    if (!data.results.length) localStorage.removeItem('token');
    dispatch(saveTriviaQuestions(data.results));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
