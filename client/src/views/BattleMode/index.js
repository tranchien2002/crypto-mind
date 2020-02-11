import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Avatar, Badge, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import * as room from '../../actions/roomAction';

import './battleMode.css';

const { Header, Content, Footer } = Layout;

function BattleMode() {
  const content = useSelector((state) => state.roomStatus);
  const dispatch = useDispatch();

  function selectRoom(id) {
    dispatch(room.updateCurrentRoom(id));
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
            <Link to='/profile'>
              <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
            </Link>
          </Col>
        </Row>
      </Header>
      <Content>
        {content.games.map((game, index) => (
          <Row gutter={[0, 16]} type='flex' justify='center' align='middle' key={index}>
            <Col xs={18}>
              <Row className='info-room' type='flex' justify='space-around' align='middle'>
                <span>RoomID: {game.id} </span>
                <span>
                  <Badge count={game.currentMember + '/' + game.member}>
                    <Avatar shaspane='circle' icon='user' size={24} />
                  </Badge>
                </span>
                <span>
                  <Icon type='clock-circle' style={{ fontSize: '24px' }} theme='twoTone' />
                  {game.time} s
                </span>

                <span>
                  <Icon type='money-collect' style={{ fontSize: '24px' }} theme='filled' />
                  {game.amount} TOMO
                </span>
              </Row>
            </Col>

            <Col xs={6}>
              <Link to='/waiting'>
                <Button type='danger' size='large' onClick={() => selectRoom(game.id)}>
                  Join
                </Button>
              </Link>
            </Col>
          </Row>
        ))}
      </Content>
      <Footer>
        <Button type='primary' size='large'>
          <Link to='create'>Create Room</Link>
        </Button>
      </Footer>
    </Layout>
  );
}

export default BattleMode;
