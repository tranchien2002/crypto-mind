import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useInterval from 'useInterval';
import * as contract from 'actions/contractAction';

function RedirectRouter() {
  const currentGame = useSelector((state) => state.contractStatus.currentGame);
  const currentBlock = useSelector((state) => state.contractStatus.currentBlock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contract.updateCurrentBlock());
  }, [dispatch]);

  useInterval(() => {
    dispatch(contract.updateCurrentBlock());
  }, 2000);

  return (
    <div>
      {currentGame ? (
        currentGame.result === '0' ? (
          currentGame.blockStart === '0' ? (
            <Redirect to='/waiting' />
          ) : parseInt(currentBlock) >
            parseInt(currentGame.blockStart) + parseInt(currentGame.blockTimeout) ? (
            <Redirect to='/battle' />
          ) : (
            <Redirect to='/battleGame' />
          )
        ) : (
          <Redirect to='/battle' />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default RedirectRouter;
