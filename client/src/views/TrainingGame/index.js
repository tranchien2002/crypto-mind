import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, message, Avatar, Icon, Layout } from 'antd';
import * as gameAction from 'actions/gameAction';
import genQuestion from 'utils/genQuestion';
import { Link, useHistory } from 'react-router-dom';

import './trainingGame.css';
import Game from 'components/Game';

const { Header } = Layout;

function TrainingGame() {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.gameStatus);
  const [isAnswer, setIsAnswer] = useState(false);
  const [targetTime, setTargetTime] = useState(Date.now() + 10000);
  const [question, setQuestion] = useState(genQuestion(Date.now(), 10, 5));

  let history = useHistory();

  useEffect(() => {
    dispatch(gameAction.updateCurrentQuestion(0));
    dispatch(gameAction.updateScore(0));
  }, [dispatch]);

  function onFinish() {
    dispatch(gameAction.updateCurrentQuestion(gameStatus.currentQues + 1));
    setTargetTime(Date.now() + 10000);
    setIsAnswer(false);

    // generate infinity question
    if ((gameStatus.currentQues + 2) % 10 === 0) {
      setQuestion(question.concat(genQuestion(Date.now(), 10, 5)));
    }
  }

  async function checkAns(ans) {
    /* eslint no-eval: 0 */

    if (eval(question[gameStatus.currentQues].ques) === ans) {
      setIsAnswer(true);
      await message.loading('Submiting..', 0.5);
      dispatch(gameAction.updateScore(gameStatus.score + 1));
      message.success('Answer correct', 1.0);
      onFinish();
    } else {
      setIsAnswer(true);
      await message.loading('Submiting..', 0.5);
      message.error('Answer wrong', 1.0);
      onFinish();
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
            <Link to='/profile' onClick={() => history.push('/training')}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
            </Link>
          </Col>
        </Row>
      </Header>
      <Game
        targetTime={targetTime}
        onFinish={onFinish}
        isAnswer={isAnswer}
        checkAns={checkAns}
        question={question}
      />
    </Layout>
  );
}

export default TrainingGame;
