import CryptoMind from 'contracts/CryptoMind.json';
import { checkBeforeDoTransaction } from 'actions/getInfoAction';
import { listenEventStart } from 'actions/gameAction';
import { message } from 'antd';

export const CURRENT_ROOM = 'CURRENT_ROOM';
export const SCORE = 'SCORE';
export const WAITING_ROOM = 'WAITING_ROOM';
export const GAME_STATUS = 'GAME_STATUS';
export const INIT_CONTRACT = 'INIT_CONTRACT';

export const updateWaitingRoom = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.contractStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  let msg = dispatch(checkBeforeDoTransaction());
  if (!crytoMind) {
    console.log(msg);
  } else {
    const from = state.infoStatus.userAddress;
    var waitingRoomsId = await crytoMind.methods.getWaitingRoom().call({ from });
    var waitingRooms = [];

    var room = {};

    for (let i = 0; i < waitingRoomsId.length; i++) {
      room = await crytoMind.methods.rooms(waitingRoomsId[i]).call({ from });
      room.roomID = waitingRoomsId[i];
      room.bounty = web3.utils.fromWei(room.bounty);
      room.players = await crytoMind.methods.getPlayerRoom(waitingRoomsId[i]).call({ from });
      waitingRooms.push(room);
    }

    dispatch({
      type: WAITING_ROOM,
      waitingRooms
    });

    dispatch(updateCurrentRoom());
  }
};

export const updateCurrentRoom = () => async (dispatch, getState) => {
  console.log('log');
  const state = getState();
  const crytoMind = state.contractStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  let msg = dispatch(checkBeforeDoTransaction());
  if (msg) {
    console.log(msg);
  } else {
    const from = state.infoStatus.userAddress;
    let currentGame = await crytoMind.methods.roomOf(from).call({ from });
    let blockStart = currentGame.blockStart;
    currentGame.bounty = web3.utils.fromWei(currentGame.bounty);
    currentGame.players = await crytoMind.methods.getPlayerRoom(currentGame.roomId).call({ from });
    currentGame.playerCount = currentGame.players.length;
    for (let i = 0; i < currentGame.roomSize; i++) {
      if (!currentGame.players[i]) {
        currentGame.players.push(undefined);
      }
    }
    currentGame.currentBlock = await web3.eth.getBlockNumber();
    dispatch({
      type: CURRENT_ROOM,
      currentGame,
      blockStart
    });
  }
};

export const createRoom = (bounty, roomSize, blockTimeout) => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.contractStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  let msg = dispatch(checkBeforeDoTransaction());
  if (msg) {
    message.warning(msg);
  } else {
    const from = state.infoStatus.userAddress;
    bounty = web3.utils.toWei(bounty, 'ether');
    await crytoMind.methods
      .createRoom(bounty, roomSize, blockTimeout)
      .send({ from: from, value: bounty })
      .then(() => {
        dispatch(updateCurrentRoom());
      })
      .catch((e) => {
        console.log("Error: can't create room", e);
      });
  }
};

export const joinRoom = (roomID, bounty) => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.contractStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  let msg = dispatch(checkBeforeDoTransaction());
  if (msg) {
    message.warning(msg);
  } else {
    const from = state.infoStatus.userAddress;
    bounty = web3.utils.toWei(bounty, 'ether');
    await crytoMind.methods
      .joinRoom(roomID)
      .send({ from: from, value: bounty })
      .then(async () => {
        await dispatch(updateCurrentRoom());
        await dispatch(listenEventStart());
      })
      .catch((e) => {
        console.log("Error: can't join room", e);
      });
  }
};

export const quitGame = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.contractStatus.cryptoMind;
  let msg = dispatch(checkBeforeDoTransaction());
  if (msg) {
    message.warning(msg);
  } else {
    const from = state.infoStatus.userAddress;
    await crytoMind.methods
      .quitGame()
      .send({ from: from })
      .then(() => {
        dispatch(updateCurrentRoom());
      })
      .catch((e) => {
        console.log("Error: can't quit room", e);
      });
  }
};

export const submitAnswer = () => async (dispatch, getState) => {
  const state = getState();
  let cryptoMind = state.contractStatus.cryptoMind;
  let score = state.gameStatus.score;

  let msg = dispatch(checkBeforeDoTransaction());
  if (msg) {
    console.log(msg);
  } else {
    const from = state.infoStatus.userAddress;
    await cryptoMind.methods
      .submitAnswer(score)
      .send({ from: from })
      .then(() => {
        // dispatch(gameStatus());
        console.log('success');
      })
      .catch((e) => {
        console.log("Error: can't create room", e);
      });
  }
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
