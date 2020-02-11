export const CURRENT_ROOM = 'CURRENT_ROOM';
export const SCORE = 'SCORE';

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
