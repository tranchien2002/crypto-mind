import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default App;
