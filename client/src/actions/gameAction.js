import genQuestion from 'utils/genQuestion';
export const CURRENT_QUES = 'CURRENT_QUES';
export const SCORE = 'SCORE';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
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

export const listenEventStart = () => async (dispatch, getState) => {
  const state = getState();
  let cryptoMind = state.contractStatus.cryptoMind;
  let currentGame = state.contractStatus.currentGame;
  let web3 = state.infoStatus.web3;
  if (currentGame && web3) {
    let currentBlock = await web3.eth.getBlockNumber();
    if (currentGame.blockStart > 0) {
      cryptoMind
        .getPastEvents(
          'StartGame',
          {
            filter: { roomId: [currentGame.roomId] },
            fromBlock: currentGame.blockStart,
            toBlock: 'latest'
          },
          function(error, events) {
            let battleQuestions = genQuestion(events[0].returnValues['seed'], 10, 5);
            dispatch({
              type: UPDATE_QUESTIONS,
              battleQuestions
            });
          }
        )
        .catch('error', console.error);
    } else {
      cryptoMind.events
        .StartGame(
          {
            filter: { roomId: [currentGame.roomId] },
            fromBlock: currentBlock
          },
          function(error, events) {
            let battleQuestions = genQuestion(events.returnValues['seed'], 10, 5);
            dispatch({
              type: UPDATE_QUESTIONS,
              battleQuestions
            });
          }
        )
        .on('error', console.error);
    }
  }
};
