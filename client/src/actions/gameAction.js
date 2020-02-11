export const CURRENT_QUES = 'CURRENT_QUES';
export const SCORE = 'SCORE';

export const updateCurrentQuestion = (currentQues) => async (dispatch) => {
  dispatch({
    type: CURRENT_QUES,
    currentQues
  });
};

export const updateScore = (score) => async (dispatch) => {
  dispatch({
    type: SCORE,
    score
  });
};
