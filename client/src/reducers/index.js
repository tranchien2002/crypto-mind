import infoReducer from './InfoReducer';
import gameReducer from './GameReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  infoStatus: infoReducer,
  gameStatus: gameReducer
});

export default rootReducer;
