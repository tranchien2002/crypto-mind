import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function RedirectRouter() {
  const gameStatus = useSelector((state) => state.roomStatus.gameStatus);

  return (
    <div>
      {gameStatus ? (
        gameStatus.result === '0' ? (
          gameStatus.blockStart === '0' ? (
            <Redirect to='/waiting' />
          ) : (
            <Redirect to='/training' />
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
