import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Statistic, Button, Layout } from 'antd';

const { Content } = Layout;
const { Countdown } = Statistic;

function Game({ isAnswer, targetTime, onFinish, checkAns, question }) {
  const abcd = ['A', 'B', 'C', 'D'];
  const gameStatus = useSelector((state) => state.gameStatus);

  return (
    <Content>
      <Row gutter={[0, 16]} type='flex' justify='center'>
        <Col span={24}>
          <Countdown title='Timer' value={targetTime} onFinish={onFinish} format='mm:ss' />
        </Col>

        <Col span={24}>
          <p>Question Number {gameStatus.currentQues + 1}</p>
        </Col>
        {question[gameStatus.currentQues] ? (
          <Row gutter={[0, 16]} type='flex' justify='center'>
            <Col span={22}>
              <p>{question[gameStatus.currentQues].ques}</p>
            </Col>

            {question[gameStatus.currentQues].ans.map((ans, index) => (
              <Col span={16} key={index}>
                {isAnswer ? (
                  <Button disabled className='bt_length'>
                    {abcd[index]}. {ans}
                  </Button>
                ) : (
                  <Button onClick={() => checkAns(ans)} className='bt_length'>
                    {abcd[index]}. {ans}
                  </Button>
                )}
              </Col>
            ))}
          </Row>
        ) : (
          <></>
        )}
      </Row>
    </Content>
  );
}

export default Game;
