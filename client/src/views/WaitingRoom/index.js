import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Avatar, Layout, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import './waitingRoom.css';

const { Header, Content, Footer } = Layout;

function WaitingRoom() {
  const content = useSelector((state) => state); //this hook gives us redux store state

  return (
    <div>
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
            <Col span={24} className='title-waiting'>
              <p>Waiting Room</p>
            </Col>
            <Col xs={18}>
              <Row className='info-room' type='flex' justify='space-around' align='middle'>
                <span>RoomID: 7 </span>
                <span>
                  <Badge count={'1 / 4'}>
                    <Avatar shaspane='circle' icon='user' size={24} />
                  </Badge>
                </span>
                <span>
                  <Icon type='clock-circle' style={{ fontSize: '24px' }} theme='twoTone' /> 15s
                </span>

                <span>
                  <Icon type='money-collect' style={{ fontSize: '24px' }} theme='filled' /> 3
                </span>
              </Row>
            </Col>

            <Col span={22}>
              <p>
                Players have to pass 10 questions about mental arithmetic by beat other players to
                record prize of game.
              </p>
            </Col>
            <Col span={20} offset={4} className='addres-user'>
              <Icon
                type='check-circle'
                theme='twoTone'
                style={{ fontSize: '24px' }}
                twoToneColor='#52c41a'
              />
              <span>
                {` ${content.infoStatus.userAddress.substr(
                  0,
                  6
                )}...${content.infoStatus.userAddress.substr(-4)}`}
              </span>
            </Col>

            <Col span={20} offset={4} className='addres-user'>
              <Icon type='sync' spin style={{ fontSize: '24px' }} />
              <span> User2</span>
            </Col>

            <Col span={20} offset={4} className='addres-user'>
              <Icon type='sync' spin style={{ fontSize: '24px' }} />
              <span> User3</span>
            </Col>

            <Col span={20} offset={4} className='addres-user'>
              <Icon type='sync' spin style={{ fontSize: '24px' }} />
              <span> User4</span>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default WaitingRoom;
