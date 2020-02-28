import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Avatar, Layout, Icon, Badge } from 'antd';
import RedirectRouter from 'components/RedirectRouter';
import { Link, useHistory } from 'react-router-dom';
import * as contract from 'actions/contractAction';
import * as game from 'actions/gameAction';

import './waitingRoom.css';
import useInterval from 'useInterval';
const { Header, Content, Footer } = Layout;

function WaitingRoom() {
  const roomStatus = useSelector((state) => state.contractStatus);
  const contractStatus = useSelector((state) => state.contractStatus);
  const currentGame = roomStatus.currentGame;
  const dispatch = useDispatch();

  let history = useHistory();

  useEffect(() => {
    dispatch(game.listenEventStart());
    // dispatch(game.listenJoinRoom());
    // dispatch(game.listenQuitRoom());
  }, [roomStatus.blockStart, dispatch]);

  useEffect(() => {
    if (!contractStatus.currentGame) dispatch(contract.updateCurrentRoom());
  }, [dispatch, contractStatus]);

  useInterval(() => {
    dispatch(game.listenEventStart());
  }, 1000);

  return (
    <Layout>
      <RedirectRouter />
      <Header>
        <Row type='flex' justify='space-between'>
          <Col xs={4}>
            <div onClick={() => dispatch(contract.quitGame())}>
              <Icon type='left' style={{ fontSize: '15px', color: '#fff' }} />
            </div>
          </Col>
          <Col xs={4}>
            <Link to='/profile' onClick={() => history.push('/waiting')}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon='user' size='large' />
            </Link>
          </Col>
        </Row>
      </Header>

      <Content>
        <Row gutter={[0, 16]} type='flex' justify='center'>
          <Col span={24} className='title-waiting'>
            <p>Waiting Room</p>
          </Col>
          {currentGame ? (
            <>
              <Col xs={18}>
                <Row className='info-room' type='flex' justify='space-around' align='middle'>
                  <span>RoomID: {currentGame.roomId} </span>
                  <span>
                    <Badge count={currentGame.playerCount + '/' + currentGame.roomSize}>
                      <Avatar shaspane='circle' icon='user' size={24} />
                    </Badge>
                  </span>
                  <span>
                    <Icon type='clock-circle' style={{ fontSize: '24px' }} theme='twoTone' />
                    {((currentGame.blockTimeout - 4) * 2) / 10} s
                  </span>

                  <span>
                    <Icon type='money-collect' style={{ fontSize: '24px' }} theme='filled' />
                    {currentGame.bounty} TOMO
                  </span>
                </Row>
              </Col>

              <Col span={22}>
                <p>
                  Players have to pass 10 questions about mental arithmetic by beat other players to
                  record prize of game.
                </p>
              </Col>

              {currentGame.players.map((player, index) =>
                player ? (
                  <Col key={index} span={20} offset={4} className='addres-user'>
                    <Icon
                      type='check-circle'
                      theme='twoTone'
                      style={{ fontSize: '24px' }}
                      twoToneColor='#52c41a'
                    />
                    <span>{` ${player.substr(0, 6)}...${player.substr(-4)}`}</span>
                  </Col>
                ) : (
                  <Col key={index} span={20} offset={4} className='addres-user'>
                    <Icon type='sync' spin style={{ fontSize: '24px' }} />
                    <span> Waiting User</span>
                  </Col>
                )
              )}
            </>
          ) : (
            <></>
          )}
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default WaitingRoom;
