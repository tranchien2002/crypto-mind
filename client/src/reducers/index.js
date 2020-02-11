import infoReducer from './InfoReducer';
import gameReducer from './GameReducer';
import roomReducer from './RoomReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  infoStatus: infoReducer,
  gameStatus: gameReducer,
  roomStatus: roomReducer
});

export default rootReducer;
