// const getWeb3 = require('@dotrungkien/get-web3');
import { MetaMark, TomoWallet } from '../utils/getWeb3';

export const WEB3_CONNECT = 'WEB3_CONNECT';
export const GET_USERINFO = 'GET_USERINFO';

export const web3Connect = () => async (dispatch) => {
  var web3;
  try {
    if (window.web3) {
      if (window.web3.currentProvider.isMetaMask) {
        web3 = await MetaMark();
      } else if (window.web3.currentProvider.isTomoWallet) {
        web3 = await TomoWallet();
      }

      dispatch({
        type: WEB3_CONNECT,
        web3
      });

      dispatch(getProfile());
    }
  } catch (error) {
    alert(`Failed to load web3, accounts, or contract. Check console for details.`);
    console.error(error);
  }
};

export const getProfile = () => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.infoStatus.web3;
  const account = await web3.eth.getAccounts();
  if (account.length > 0) {
    const userAddress = account[0];
    var balance = await web3.eth.getBalance(userAddress);
    balance = web3.utils.fromWei(balance);

    if (balance.includes('.')) {
      let interger = balance.split('.', 2)[0];
      let fractional = balance.split('.', 2)[1].substr(0, 4);
      balance = interger.concat('.', fractional, ' ');
    }

    dispatch({
      type: GET_USERINFO,
      userAddress,
      balance
    });
  } else {
    console.log('Account not found');
  }
};

export const web3TomoWalletConnect = () => async (dispatch) => {};
