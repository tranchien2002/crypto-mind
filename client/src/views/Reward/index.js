import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button, Layout, Avatar, Row, Col } from 'antd';

import './reward.css';

function Reward() {
  const { Header, Footer, Content } = Layout;
  const content = useSelector((state) => state);

  let history = useHistory();

  return (
    <Layout>
      <Header>
        <Row type='flex' justify='space-between'>
          <Col></Col>
          <Col xs={4}>
            <Link to='/profile' onClick={() => history.push('/reward')}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
            </Link>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row type='flex' justify='center' align='middle' className='h_100per'>
          <h1 className='t_bold'>BATTLE REWARDS</h1>
          <Col span={24}>
            <p>User Score</p>
            <p>{content.gameStatus.score}</p>
          </Col>
          <Col>
            <Row type='flex'>
              <Col span={4}>
                <Avatar size={50} icon='user' />
              </Col>
              <Col span={20} className='a_left'>
                <p className='t_bold'>First Prime</p>
                <p className='fs_09em'>0x4C637fC36ecA2d02d5214b53c0aEc272f31F7E53</p>
              </Col>
            </Row>

            <Row type='flex'>
              <Col span={4}>
                <Avatar size={50} icon='user' />
              </Col>
              <Col span={20} className='a_left'>
                <p className='t_bold'>Second Prime</p>
                <p className='fs_09em'>0x4C637fC36ecA2d02d5214b53c0aEc272f31F7E53</p>
              </Col>
            </Row>

            <Row type='flex'>
              <Col span={4}>
                <Avatar size={50} icon='user' />
              </Col>
              <Col span={20} className='a_left'>
                <p className='t_bold'>Third Prime</p>
                <p className='fs_09em'>0x4C637fC36ecA2d02d5214b53c0aEc272f31F7E53</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer>
        <Button type='primary' size='large'>
          <Link to='/'>Back</Link>
        </Button>
      </Footer>
    </Layout>
  );
}

export default Reward;
