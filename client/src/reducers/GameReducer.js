import * as game from 'actions/gameAction';

const initialState = {
  question: [
    {
      ques: '75+51',
      ans: [156, 126, 116, 136]
    },
    {
      ques: '148+77',
      ans: [205, 195, 225, 245]
    },
    {
      ques: '178+81',
      ans: [158, 259, 219, 269]
    },
    {
      ques: '51+181',
      ans: [232, 132, 245, 214]
    },
    {
      ques: '2 + 5 + 3 + 4 + 7 + 9',
      ans: [30, 29, 31, 28]
    },
    {
      ques: '2 * 3 + 4 * 2 + 7 + 2',
      ans: [21, 24, 25, 23]
    }
  ],
  currentQues: 0,
  score: 0,
  questions: []
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
        questions: action.questions
      };
    default:
      return state;
  }
};

export default gameReducer;
