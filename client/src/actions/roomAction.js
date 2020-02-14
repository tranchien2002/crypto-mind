export const CURRENT_ROOM = 'CURRENT_ROOM';
export const SCORE = 'SCORE';
export const WAITING_ROOM = 'WAITING_ROOM';
export const GAME_STATUS = 'GAME_STATUS';

export const updateWaitingRoom = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.gameStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  if (crytoMind) {
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

    dispatch(gameStatus());
  }
};

export const updateCurrentRoom = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.gameStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  if (crytoMind) {
    const from = state.infoStatus.userAddress;
    if (from) {
      let currentGame = await crytoMind.methods.roomOf(from).call({ from });
      currentGame.bounty = web3.utils.fromWei(currentGame.bounty);
      currentGame.players = await crytoMind.methods
        .getPlayerRoom(currentGame.roomId)
        .call({ from });
      currentGame.playerCount = currentGame.players.length;
      for (let i = 0; i < currentGame.roomSize; i++) {
        if (!currentGame.players[i]) {
          currentGame.players.push(undefined);
        }
      }
      dispatch({
        type: CURRENT_ROOM,
        currentGame
      });

      dispatch(gameStatus());
    }
  }
};

export const joinRoom = (roomID, bounty) => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.gameStatus.cryptoMind;
  let web3 = state.infoStatus.web3;
  if (crytoMind) {
    const from = state.infoStatus.userAddress;
    bounty = web3.utils.toWei(bounty, 'ether');
    await crytoMind.methods
      .joinRoom(roomID)
      .send({ from: from, value: bounty })
      .then(() => {
        dispatch(gameStatus());
      })
      .catch((e) => {
        console.log("Error: can't join room", e);
      });
  }
};

export const quitGame = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.gameStatus.cryptoMind;
  if (crytoMind) {
    const from = state.infoStatus.userAddress;
    await crytoMind.methods
      .quitGame()
      .send({ from: from })
      .then(() => {
        dispatch(gameStatus());
      })
      .catch((e) => {
        console.log("Error: can't quit room", e);
      });
  }
};

export const gameStatus = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.gameStatus.cryptoMind;
  if (crytoMind) {
    const from = state.infoStatus.userAddress;
    if (from) {
      let currentGame = await crytoMind.methods.roomOf(from).call({ from });
      dispatch({
        type: GAME_STATUS,
        gameStatus: currentGame
      });
    }
  }
};
