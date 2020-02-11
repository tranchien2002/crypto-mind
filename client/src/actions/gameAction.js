export const CURRENT_QUES = 'CURRENT_QUES';
export const SCORE = 'SCORE';

export const updateCurrentQuestion = (currentQues) => async (dispatch) => {
  dispatch({
    type: CURRENT_QUES,
    currentQues
  });
};

export const updateScore = () => async (dispatch, getState) => {
  const state = getState();
  let score = state.gameStatus.score;
  dispatch({
    type: SCORE,
    score: score + 1
  });
};
