import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Avatar, Statistic, Button, Layout, Icon, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import * as gameAction from 'actions/gameAction';

import './trainingMode.css';

const { Header, Content, Footer } = Layout;
const { Countdown } = Statistic;

function TrainingMode(props) {
  const dispatch = useDispatch();
  const content = useSelector((state) => state);
  const [isAnswer, setIsAnswer] = useState(false);
  const [targetTime, setTargetTime] = useState(Date.now() + 10000);
  const abcd = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    if (props.location.state) {
      if (props.location.state.isTraining) {
        dispatch(gameAction.updateCurrentQuestion(0));
        dispatch(gameAction.updateScore(0));
      }
    }
  }, [dispatch, props]);

  function onFinish() {
    dispatch(gameAction.updateCurrentQuestion(content.gameStatus.currentQues + 1));
    setTargetTime(Date.now() + 10000);
    setIsAnswer(false);
  }

  async function checkAns(ans) {
    /* eslint no-eval: 0 */
    if (eval(content.gameStatus.question[content.gameStatus.currentQues].ques) === ans) {
      setIsAnswer(true);
      await message.loading('Submiting..', 0.5);
      await dispatch(gameAction.updateScore(content.gameStatus.score + 1));
      message.success('Answer correct', 1.0);
      onFinish();
    } else {
      setIsAnswer(true);
      await message.loading('Submiting..', 0.5);
      message.error('Answer wrong', 1.0);
      onFinish();
    }
  }

  return content.gameStatus.question[content.gameStatus.currentQues] ? (
    <Layout>
      <Header>
        <Row type='flex' justify='space-between'>
          <Col xs={4}>
            <Link to='/'>
              <Icon type='left' style={{ fontSize: '15px', color: '#fff' }} />
            </Link>
          </Col>
          <Col xs={4}>
            <Link to='/profile'>
              <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
            </Link>
          </Col>
        </Row>
      </Header>

      <Content>
        <Row gutter={[0, 16]} type='flex' justify='center'>
          <Col span={24}>
            <Countdown title='Timer' value={targetTime} onFinish={onFinish} format='mm:ss' />
          </Col>

          <Col span={24}>
            <p>Question Number {content.gameStatus.currentQues + 1}</p>
          </Col>

          <Col span={22}>
            <p>{content.gameStatus.question[content.gameStatus.currentQues].ques}</p>
          </Col>

          {content.gameStatus.question[content.gameStatus.currentQues].ans.map((ans, index) => (
            <Col span={22} key={index}>
              {isAnswer ? (
                <Button disabled>
                  {abcd[index]}. {ans}
                </Button>
              ) : (
                <Button onClick={() => checkAns(ans)}>
                  {abcd[index]}. {ans}
                </Button>
              )}
            </Col>
          ))}
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  ) : (
    <Redirect push to='/reward' />
  );
}

export default TrainingMode;
