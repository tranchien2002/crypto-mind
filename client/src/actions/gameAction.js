import CryptoMind from 'contracts/CryptoMind.json';

export const CURRENT_QUES = 'CURRENT_QUES';
export const SCORE = 'SCORE';
export const INIT_CONTRACT = 'INIT_CONTRACT';

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

export const initContract = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.infoStatus.web3;
  if (web3) {
    const networkId = process.env.REACT_APP_TOMO_ID;
    let cryptoMindAddress = CryptoMind.networks[networkId].address;
    let cryptoMind = new web3.eth.Contract(CryptoMind.abi, cryptoMindAddress, {
      transactionConfirmationBlocks: 1
    });
    dispatch({
      type: INIT_CONTRACT,
      cryptoMind
    });
  }
};

export const listenEventStart = () => async (dispatch, getState) => {
  const state = getState();
  let cryptoMind = state.gameStatus.cryptoMind;
  let currentGame = state.roomStatus.currentGame;
  if (currentGame.blockStart > 0) {
    cryptoMind
      .getPastEvents(
        'StartGame',
        {
          filter: { roomId: [currentGame.roomId] },
          fromBlock: 0,
          toBlock: 'latest'
        },
        function(error, events) {
          console.log(events[0].returnValues.seed);
        }
      )
      .then((e) => {
        console.log(e); // same results as the optional callback above
      });
  } else {
    cryptoMind.events
      .StartGame(
        {
          filter: { roomId: [currentGame.roomId] },
          fromBlock: 0
        },
        function(error, events) {
          console.log(events[0].returnValues.seed);
        }
      )
      .on('error', console.error);
  }
};
