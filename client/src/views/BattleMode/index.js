import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInterval from 'useInterval';
import { Row, Col, Button, Avatar, Badge, Icon, Layout, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import RedirectRouter from 'components/RedirectRouter';
import CreateGame from 'views/CreateGame';
import * as room from 'actions/contractAction';

import './battleMode.css';

const { Header, Content, Footer } = Layout;

function BattleMode() {
  const [bounty, setBounty] = useState(2);
  const [roomSize, setRoomSize] = useState(5);
  const [blockTimeout, setBlockTimeout] = useState(6);
  const content = useSelector((state) => state.contractStatus);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  let history = useHistory();

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

  function createGame(bounty, roomSize, timePerQues) {
    // 4 block for submit
    const blockTimeout = (timePerQues / 2) * 10 + 4;
    dispatch(room.createRoom(bounty, roomSize, blockTimeout));
    setVisible(false);
  }

  return (
    <Layout>
      <RedirectRouter />
      <Modal
        title=''
        visible={visible}
        onOk={() => createGame(bounty, roomSize, blockTimeout)}
        onCancel={() => setVisible(false)}
      >
        <CreateGame
          bounty={bounty}
          setBounty={setBounty}
          roomSize={roomSize}
          setRoomSize={setRoomSize}
          blockTimeout={blockTimeout}
          setBlockTimeout={setBlockTimeout}
        />
      </Modal>
      <Header>
        <Row type='flex' justify='space-between'>
          <Col xs={4}>
            <Link to='/'>
              <Icon type='left' style={{ fontSize: '15px', color: '#fff' }} />
            </Link>
          </Col>
          <Col xs={4}>
            <Link to='/profile' onClick={() => history.push('/battle')}>
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
                    {((game.blockTimeout - 4) * 2) / 10} s
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
        <Button type='primary' size='large' onClick={() => setVisible(true)}>
          Create Room
        </Button>
      </Footer>
    </Layout>
  );
}

export default BattleMode;
