import * as room from 'actions/roomAction';

const initialState = {
  waitingRooms: null,
  currentGame: null,
  isJoinGame: false
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
    case room.IS_JOIN_ROOM:
      return {
        ...state,
        isJoinGame: action.isJoinGame
      };
    default:
      return state;
  }
};

export default roomReducer;
