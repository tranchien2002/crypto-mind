import * as room from '../actions/roomAction';

const initialState = {
  games: [
    {
      id: 0,
      member: 3,
      currentMember: 2,
      time: 5,
      amount: 3
    },
    {
      id: 1,
      member: 3,
      currentMember: 1,
      time: 15,
      amount: 3
    },
    {
      id: 2,
      member: 4,
      currentMember: 1,
      time: 10,
      amount: 5
    }
  ],
  currentGameID: null,
  gameMember: null,
  currentGameMember: null,
  currentGameTime: null,
  currentGameAmount: null
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case room.CURRENT_ROOM:
      return {
        ...state,
        currentGameID: action.currentGameID,
        gameMember: action.gameMember,
        currentGameMember: action.currentGameMember,
        currentGameTime: action.currentGameTime,
        currentGameAmount: action.currentGameAmount
      };

    default:
      return state;
  }
};

export default roomReducer;
