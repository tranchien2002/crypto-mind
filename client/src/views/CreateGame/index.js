import React, { useState } from 'react';
import { Row, Col, Button, Avatar, Icon, Layout, Radio } from 'antd';
import { Link } from 'react-router-dom';

import './createGame.css';

const { Header, Content, Footer } = Layout;

function CreateGame() {
  const [persons, setPersons] = useState(2);
  const [seconds, setSeconds] = useState(5);
  const [amount, setAmounts] = useState(3);

  return (
    <div>
      <Layout>
        <Header>
          <Row type='flex' justify='space-between'>
            <Col xs={4}>
              <Link to='/battle'>
                <Icon type='left' style={{ fontSize: '15px', color: '#fff' }} />
              </Link>
            </Col>
            <Col>
              <h1 className='c_white'>Battle Mode</h1>
            </Col>
            <Col xs={4}>
              <Link to='/profile'>
                <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
              </Link>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row className='h_50' type='flex' justify='center' align='middle'>
            <p className='p_break'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s.
            </p>
          </Row>
          <Col>
            <Col>
              <p>Number of person</p>
              <Radio.Group
                className='w_100per'
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              >
                <Row type='flex' justify='space-around'>
                  <Radio.Button value='2'>2</Radio.Button>
                  <Radio.Button value='3'>3</Radio.Button>
                  <Radio.Button value='5'>5</Radio.Button>
                </Row>
              </Radio.Group>
            </Col>

            <Col>
              <p>Number of seconds to answer questions</p>
              <Radio.Group
                className='w_100per'
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              >
                <Row type='flex' justify='space-around'>
                  <Radio.Button value='5'>5</Radio.Button>
                  <Radio.Button value='10'>10</Radio.Button>
                  <Radio.Button value='15'>15</Radio.Button>
                </Row>
              </Radio.Group>
            </Col>

            <Col>
              <p>Number amount for each question</p>
              <Radio.Group
                className='w_100per'
                value={amount}
                onChange={(e) => setAmounts(e.target.value)}
              >
                <Row type='flex' justify='space-around'>
                  <Radio.Button value='3'>3</Radio.Button>
                  <Radio.Button value='5'>5</Radio.Button>
                  <Radio.Button value='10'>10</Radio.Button>
                </Row>
              </Radio.Group>
            </Col>
          </Col>
        </Content>
        <Footer>
          <Button type='primary' size='large'>
            Start
          </Button>
        </Footer>
      </Layout>
    </div>
  );
}

export default CreateGame;
