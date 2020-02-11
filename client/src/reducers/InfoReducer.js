import * as info from 'actions/getInfoAction';

const initialState = {
  web3: null,
  userAddress: '',
  balance: ''
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case info.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3
      };
    case info.GET_USERINFO:
      return {
        ...state,
        userAddress: action.userAddress,
        balance: action.balance
      };
    default:
      return state;
  }
};

export default infoReducer;
