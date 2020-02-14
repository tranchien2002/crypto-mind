import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInterval from 'useInterval';
import { Row, Col, Button, Avatar, Badge, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import RedirectRouter from 'components/RedirectRouter';
import * as room from 'actions/roomAction';

import './battleMode.css';

const { Header, Content, Footer } = Layout;

function BattleMode() {
  const content = useSelector((state) => state.roomStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(room.updateWaitingRoom());
  }, [dispatch]);

  useInterval(() => {
    dispatch(room.updateWaitingRoom());
  }, 2000);

  function selectRoom(id, bounty) {
    // dispatch(room.updateCurrentRoom(id));
    dispatch(room.joinRoom(id, bounty));
  }

  return (
    <Layout>
      <RedirectRouter />
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
        {content.waitingRooms ? (
          content.waitingRooms.map((game, index) => (
            <Row gutter={[0, 16]} type='flex' justify='center' align='middle' key={index}>
              <Col xs={18}>
                <Row className='info-room' type='flex' justify='space-around' align='middle'>
                  <span>RoomID: {game.roomID} </span>
                  <span>
                    <Badge count={game.players.length + '/' + game.roomSize}>
                      <Avatar shaspane='circle' icon='user' size={24} />
                    </Badge>
                  </span>
                  <span>
                    <Icon type='clock-circle' style={{ fontSize: '24px' }} theme='twoTone' />
                    {game.blockTimeout * 2} s
                  </span>

                  <span>
                    <Icon type='money-collect' style={{ fontSize: '24px' }} theme='filled' />
                    {game.bounty} TOMO
                  </span>
                </Row>
              </Col>

              <Col xs={6}>
                <Button
                  type='danger'
                  size='large'
                  onClick={() => selectRoom(game.roomID, game.bounty)}
                >
                  Join
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <p></p>
        )}
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
