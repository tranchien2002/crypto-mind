import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as gameAction from 'actions/gameAction';
import { message } from 'antd';
import Game from 'components/Game';
import { Redirect } from 'react-router-dom';

function BattleGame() {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus);
  const roomStatus = useSelector((state) => state.contractStatus);
  const timePerQues = (roomStatus.currentGame.blockTimeout / 10) * 2;
  const [isAnswer, setIsAnswer] = useState(false);
  const [targetTime, setTargetTime] = useState(Date.now() + timePerQues * 1000);

  function onFinish() {
    dispatch(gameAction.updateCurrentQuestion(gameStatus.currentQues + 1));
    setTargetTime(Date.now() + timePerQues * 1000);
    setIsAnswer(false);
  }

  async function checkAns(ans) {
    /* eslint no-eval: 0 */
    if (eval(gameStatus.question[gameStatus.currentQues].ques) === ans) {
      setIsAnswer(true);
      await message.loading('Submiting..', 0.5);
      dispatch(gameAction.updateScore(gameStatus.score + 1));
      message.success('Answer correct', 1.0);
    } else {
      setIsAnswer(true);
      await message.loading('Submiting..', 0.5);
      message.error('Answer wrong', 1.0);
    }
  }

  return gameStatus.question[gameStatus.currentQues] ? (
    <Game targetTime={targetTime} onFinish={onFinish} isAnswer={isAnswer} checkAns={checkAns} />
  ) : (
    <Redirect push to='/reward' />
  );
}

export default BattleGame;
