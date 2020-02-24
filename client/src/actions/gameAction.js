import genQuestion from 'utils/genQuestion';
import { checkBeforeDoTransaction } from 'actions/getInfoAction';
import { updateCurrentRoom } from 'actions/contractAction';

export const CURRENT_QUES = 'CURRENT_QUES';
export const SCORE = 'SCORE';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export const GAME_RESULT = 'GAME_RESULT';

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

export const updateGameResult = (score) => async (dispatch) => {
  dispatch({
    type: SCORE,
    score
  });
};

export const getResultOfRoom = () => async (dispatch, getState) => {
  const state = getState();
  let cryptoMind = state.contractStatus.cryptoMind;
  let currentGame = state.contractStatus.currentGame;
  let msg = dispatch(checkBeforeDoTransaction());
  if (msg) {
    console.log(msg);
  } else {
    const from = state.infoStatus.userAddress;
    if (currentGame) {
      let submitedPlayers = currentGame.submited;
      let roomId = currentGame.roomId;
      // Promise
      let getAllScore = submitedPlayers.map(async (submitedPlayer) => {
        let player = {};
        player.address = submitedPlayer;
        player.score = await cryptoMind.methods
          .getAnswerInRoom(submitedPlayer, roomId)
          .call({ from });
        return player;
      });

      let gameResult = await Promise.all(getAllScore);

      // sort by score
      gameResult.sort((a, b) => a.score - b.score);

      dispatch({
        type: GAME_RESULT,
        gameResult
      });
    }
  }
};

export const listenEventStart = (roomId) => async (dispatch, getState) => {
  const state = getState();
  let cryptoMind = state.contractStatus.cryptoMind;
  let currentGame = state.contractStatus.currentGame;
  let web3 = state.infoStatus.web3;
  if (currentGame && web3) {
    let currentBlock = state.contractStatus.currentBlock;
    if (currentGame.blockStart > 0) {
      cryptoMind
        .getPastEvents(
          'StartGame',
          {
            filter: { roomId: [roomId] },
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
            filter: { roomId: [roomId] },
            fromBlock: currentBlock
          },
          function(error, events) {
            dispatch(updateCurrentRoom());
            // let battleQuestions = genQuestion(events.returnValues['seed'], 10, 5);
            // dispatch({
            //   type: UPDATE_QUESTIONS,
            //   battleQuestions
            // });
          }
        )
        .on('error', console.error);
    }
  }
};
