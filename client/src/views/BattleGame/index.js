import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as gameAction from 'actions/gameAction';
import { Row, Col, message, Avatar, Icon, Layout } from 'antd';
import Game from 'components/Game';
import { Redirect, Link, useHistory } from 'react-router-dom';

const { Header } = Layout;

function BattleGame() {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus);
  const contractStatus = useSelector((state) => state.contractStatus);
  const timePerQues = (contractStatus.currentGame.blockTimeout / 10) * 2;
  const [isAnswer, setIsAnswer] = useState(false);
  const [targetTime, setTargetTime] = useState(Date.now() + timePerQues * 1000);

  let history = useHistory();

  useEffect(() => {
    dispatch(gameAction.updateCurrentQuestion(0));
    dispatch(gameAction.updateScore(0));
  }, [dispatch]);

  function onFinish() {
    dispatch(gameAction.updateCurrentQuestion(gameStatus.currentQues + 1));
    setTargetTime(Date.now() + timePerQues * 1000);
    setIsAnswer(false);
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
      {gameStatus.battleQuestions[gameStatus.currentQues] ? (
        <Game
          targetTime={targetTime}
          onFinish={onFinish}
          isAnswer={isAnswer}
          checkAns={checkAns}
          question={gameStatus.battleQuestions}
        />
      ) : (
        <Redirect push to='/reward' />
      )}
    </Layout>
  );
}

export default BattleGame;
