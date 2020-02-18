import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function RedirectRouter() {
  const gameStatus = useSelector((state) => state.contractStatus.gameStatus);

  return (
    <div>
      {gameStatus ? (
        gameStatus.result === '0' ? (
          gameStatus.blockStart === '0' ? (
            <Redirect to='/waiting' />
          ) : gameStatus.currentBlock >
            parseInt(gameStatus.blockStart) + parseInt(gameStatus.blockTimeout) ? (
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
