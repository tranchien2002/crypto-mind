import infoReducer from './InfoReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  infoStatus: infoReducer
});

export default rootReducer;
