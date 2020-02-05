import * as info from '../actions/getInfoAction';

const initialState = {
  userAddress: '0x4C637fC36ecA2d02d5214b53c0aEc272f31F7E53',
  balance: '15'
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case info.LOGIN:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default loginReducer;
