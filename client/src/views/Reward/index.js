import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button, Layout, Avatar, Row, Col } from 'antd';

import './reward.css';
import useInterval from 'useInterval';
import * as contract from 'actions/contractAction';
import * as gameActions from 'actions/gameAction';

function Reward() {
  const { Header, Footer, Content } = Layout;
  const gameStatus = useSelector((state) => state.gameStatus);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(gameActions.getResultOfRoom());
  }, [dispatch, gameStatus.gameResult.length]);

  useInterval(() => {
    dispatch(contract.updateCurrentRoom());
    dispatch(gameActions.getResultOfRoom());
  }, 1000);

  return (
    <Layout>
      <Header>
        {/* {console.log(gameStatus.gameResult)} */}
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
            <p>{gameStatus.score}</p>
          </Col>
          <Col>
            {gameStatus.gameResult.map((player, index) => (
              <Row type='flex' key={index}>
                <Col span={4}>
                  <Avatar size={50} icon='user' />
                </Col>
                <Col span={20} className='a_left'>
                  <p className='t_bold'>Score : {player.score}</p>
                  <p className='fs_09em'>{player.address}</p>
                </Col>
              </Row>
            ))}
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
