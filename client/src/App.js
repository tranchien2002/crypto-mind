import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useInterval from './useInterval';
import * as getUserInfo from './actions/getInfoAction';
import Router from './router';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getWeb3 = () => {
      window.addEventListener('load', () => {
        dispatch(getUserInfo.web3Connect());
      });
    };
    getWeb3();
  });

  useInterval(() => {
    dispatch(getUserInfo.getProfile());
  }, 2000);

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
