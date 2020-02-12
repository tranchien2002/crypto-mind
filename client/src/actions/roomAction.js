export const CURRENT_ROOM = 'CURRENT_ROOM';
export const SCORE = 'SCORE';
export const WAITING_ROOM = 'WAITING_ROOM';

export const updateWaitingRoom = () => async (dispatch, getState) => {
  const state = getState();
  const crytoMind = state.gameStatus.cryptoMind;
  if (crytoMind) {
    const from = state.infoStatus.userAddress;
    var waitingRoomsId = await crytoMind.methods.getWaitingRoom().call({ from });
    var waitingRooms = [];

    var room = {};

    for (let i = 0; i < waitingRoomsId.length; i++) {
      room = await crytoMind.methods.rooms(waitingRoomsId[i]).call({ from });
      room.roomID = waitingRoomsId[i];
      room.players = await crytoMind.methods.getPlayerRoom(waitingRoomsId[i]).call({ from });
      waitingRooms.push(room);
    }

    dispatch({
      type: WAITING_ROOM,
      waitingRooms
    });
  }
};

export const updateCurrentRoom = (id) => async (dispatch, getState) => {
  const state = getState();
  const game = state.roomStatus;
  const currentGameID = id;
  const gameMember = game.games[id].member;
  const currentGameMember = game.games[id].currentMember;
  const currentGameTime = game.games[id].time;
  const currentGameAmount = game.games[id].amount;

  dispatch({
    type: CURRENT_ROOM,
    currentGameID,
    gameMember,
    currentGameMember,
    currentGameTime,
    currentGameAmount
  });
};
