import * as game from 'actions/gameAction';

const initialState = {
  battleQuestions: [],
  currentQues: 0,
  score: 0,
  gameResult: []
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case game.CURRENT_QUES:
      return {
        ...state,
        currentQues: action.currentQues
      };
    case game.SCORE:
      return {
        ...state,
        score: action.score
      };
    case game.UPDATE_QUESTIONS:
      return {
        ...state,
        battleQuestions: action.battleQuestions
      };
    case game.GAME_RESULT:
      return {
        ...state,
        gameResult: action.gameResult
      };
    default:
      return state;
  }
};

export default gameReducer;
