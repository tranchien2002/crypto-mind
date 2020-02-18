import * as contract from 'actions/contractAction';

const initialState = {
  waitingRooms: null,
  currentGame: null,
  gameStatus: null,
  blockStart: null,
  cryptoMind: null
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case contract.CURRENT_ROOM:
      return {
        ...state,
        currentGame: action.currentGame,
        blockStart: action.blockStart
      };
    case contract.WAITING_ROOM:
      return {
        ...state,
        waitingRooms: action.waitingRooms
      };
    case contract.GAME_STATUS:
      return {
        ...state,
        gameStatus: action.gameStatus
      };
    case contract.INIT_CONTRACT:
      return {
        ...state,
        cryptoMind: action.cryptoMind
      };
    default:
      return state;
  }
};

export default roomReducer;
