import React from 'react';
//import { useSelector } from 'react-redux';
import { Row, Col, Button, Avatar, Badge, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './battleMode.css';

const { Header, Content, Footer } = Layout;

function BattleMode() {
  return (
    <div>
      <Layout>
        <Header>
          <Row type='flex' justify='space-between'>
            <Col xs={4}>
              <Link to='/'>
                <Icon type='left' style={{ fontSize: '32px', color: '#fff' }} />
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
          <Row gutter={[16, 16]} type='flex' justify='center' align='middle'>
            <Col xs={18}>
              <div class='info-room'>
                <span>RoomID: 7 </span>
                <span>
                  <Badge count={'2 / 3'}>
                    <Avatar shaspane='circle' icon='user' size={32} />
                  </Badge>
                </span>

                <span>
                  <Icon type='clock-circle' style={{ fontSize: '24px' }} theme='twoTone' /> 15s
                </span>

                <span>
                  <Icon type='money-collect' style={{ fontSize: '24px' }} theme='filled' /> 3
                </span>
              </div>
            </Col>

            <Col xs={6}>
              <Button type='danger' size='large'>
                Join
              </Button>
            </Col>
          </Row>
        </Content>
        <Footer>
          <Button type='primary' size='large'>
            Create Room
          </Button>
        </Footer>
      </Layout>
    </div>
  );
}

export default BattleMode;
