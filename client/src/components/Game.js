import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Statistic, Button, Layout } from 'antd';
import domtoimage from 'dom-to-image';
import './Game.css';
const { Content } = Layout;
const { Countdown } = Statistic;

function Game({ isAnswer, targetTime, onFinish, checkAns, question }) {
  const abcd = ['A', 'B', 'C', 'D'];
  const gameStatus = useSelector((state) => state.gameStatus);
  let ques = document.getElementById('question');
  domtoimage.toSvg(ques).then((url) => {
    let quesCol = document.getElementById('quesCol');
    if (quesCol && quesCol.firstChild) {
      quesCol.removeChild(quesCol.firstChild);
    }
    let img = new Image();
    img.src = url;
    if (quesCol) quesCol.appendChild(img);
  });
  return (
    <Content>
      <Row gutter={[0, 16]} type='flex' justify='center'>
        <Col span={24}>
          <Countdown
            valueStyle={{ fontFamily: "'Press Start 2P', 'cursive'", fontSize: '20px' }}
            title='Timer'
            value={targetTime}
            onFinish={onFinish}
            format='mm:ss'
          />
        </Col>

        <Col span={24}>
          <p>Question Number {gameStatus.currentQues + 1}</p>
        </Col>
        {question[gameStatus.currentQues] ? (
          <Row gutter={[0, 16]} type='flex' justify='center'>
            <div id='quesDiv'>
              <p id='question'>{question[gameStatus.currentQues].ques}</p>
            </div>
            <Col span={22} id='quesCol'></Col>
            {question[gameStatus.currentQues].ans.map((ans, index) => (
              <Col span={16} key={index}>
                {isAnswer ? (
                  <Button disabled className='bt_length ans_font'>
                    {abcd[index]}. {ans}
                  </Button>
                ) : (
                  <Button onClick={() => checkAns(ans)} className='bt_length ans_font'>
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
