import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function RedirectRouter() {
  const currentGame = useSelector((state) => state.contractStatus.currentGame);

  return (
    <div>
      {currentGame ? (
        currentGame.result === '0' ? (
          currentGame.blockStart === '0' ? (
            <Redirect to='/waiting' />
          ) : currentGame.currentBlock >
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
