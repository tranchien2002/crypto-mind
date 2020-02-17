import infoReducer from './InfoReducer';
import gameReducer from './GameReducer';
import contractReducer from './ContractReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  infoStatus: infoReducer,
  gameStatus: gameReducer,
  contractStatus: contractReducer
});

export default rootReducer;
