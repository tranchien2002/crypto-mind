import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as gameAction from 'actions/gameAction';
import * as contractAction from 'actions/contractAction';
import { Row, Col, Avatar, Icon, Layout, message, Spin } from 'antd';
import Game from 'components/Game';
import { Redirect, Link, useHistory } from 'react-router-dom';
import * as contract from 'actions/contractAction';
import * as game from 'actions/gameAction';
import useInterval from 'useInterval';
import './battleGame.css';
const { Header } = Layout;

function BattleGame() {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus);
  const contractStatus = useSelector((state) => state.contractStatus);
  // 4 block for submit
  let timePerQues = 0;
  const [targetTime, setTargetTime] = useState(Date.now() + timePerQues * 1000);
  const [isAnswer, setIsAnswer] = useState(false);
  if (contractStatus.currentGame) {
    timePerQues = ((contractStatus.currentGame.blockTimeout - 4) / 10) * 2;
  }
  let history = useHistory();
  useEffect(() => {
    dispatch(gameAction.updateCurrentQuestion(0));
    dispatch(gameAction.updateScore(0));
    dispatch(game.listenEventStart());
    setTargetTime(Date.now() + timePerQues * 1000);
  }, [contractStatus.blockStart, dispatch, timePerQues]);

  useInterval(() => {
    dispatch(contract.updateCurrentRoom());
  }, 1000);

  function onFinish() {
    if (gameStatus.currentQues === 9) {
      message.loading('Ready for submit', 1).then(() => dispatch(contractAction.submitAnswer()));
    } else {
      dispatch(gameAction.updateCurrentQuestion(gameStatus.currentQues + 1));
      setTargetTime(Date.now() + timePerQues * 1000);
      setIsAnswer(false);
    }
  }

  async function checkAns(ans) {
    /* eslint no-eval: 0 */
    if (eval(gameStatus.battleQuestions[gameStatus.currentQues].ques) === ans) {
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

  return (
    <Layout>
      <Header>
        <Row type='flex' justify='space-between'>
          <Col xs={4}>
            <Link to='/'>
              <Icon type='left' style={{ fontSize: '15px', color: '#fff' }} />
            </Link>
          </Col>
          <Col xs={4}>
            <Link to='/profile' onClick={() => history.push('/battleGame')}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
            </Link>
          </Col>
        </Row>
      </Header>
      {/*
          currentBlock < blockstart + blockTimeout: Must not run out of time
       */}
      {contractStatus.currentGame ? (
        contractStatus.currentGame.currentBlock <
        parseInt(contractStatus.currentGame.blockStart) +
          parseInt(contractStatus.currentGame.blockTimeout) ? (
          <Game
            targetTime={targetTime}
            onFinish={onFinish}
            isAnswer={isAnswer}
            checkAns={checkAns}
            question={gameStatus.battleQuestions}
          />
        ) : (
          <Redirect push to='/reward' />
        )
      ) : (
        <div>
          <Spin className='loading' size='large' />
        </div>
      )}
    </Layout>
  );
}

export default BattleGame;
