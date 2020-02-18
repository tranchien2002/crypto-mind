import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Avatar, Statistic, Button, Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as gameAction from 'actions/gameAction';

const { Header, Content, Footer } = Layout;
const { Countdown } = Statistic;

function Game({ isAnswer, targetTime, onFinish, checkAns }) {
  const dispatch = useDispatch();
  const abcd = ['A', 'B', 'C', 'D'];
  const gameStatus = useSelector((state) => state.gameStatus);

  useEffect(() => {
    dispatch(gameAction.updateCurrentQuestion(0));
    dispatch(gameAction.updateScore(0));
  }, [dispatch]);

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
            <p>Question Number {gameStatus.currentQues + 1}</p>
          </Col>

          <Col span={22}>
            <p>{gameStatus.question[gameStatus.currentQues].ques}</p>
          </Col>

          {gameStatus.question[gameStatus.currentQues].ans.map((ans, index) => (
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
  );
}

export default Game;
