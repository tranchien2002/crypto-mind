import * as contract from 'actions/contractAction';

const initialState = {
  waitingRooms: null,
  currentGame: null,
  blockStart: null,
  cryptoMind: null,
  currentBlock: 0
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
    case contract.INIT_CONTRACT:
      return {
        ...state,
        cryptoMind: action.cryptoMind
      };
    case contract.CURRENT_BLOCK:
      return {
        ...state,
        currentBlock: action.currentBlock
      };
    default:
      return state;
  }
};

export default roomReducer;
