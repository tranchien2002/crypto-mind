import * as room from 'actions/roomAction';

const initialState = {
  waitingRooms: null,
  currentGame: null,
  gameStatus: null
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case room.CURRENT_ROOM:
      return {
        ...state,
        currentGame: action.currentGame
      };
    case room.WAITING_ROOM:
      return {
        ...state,
        waitingRooms: action.waitingRooms
      };
    case room.GAME_STATUS:
      return {
        ...state,
        gameStatus: action.gameStatus
      };
    default:
      return state;
  }
};

export default roomReducer;
