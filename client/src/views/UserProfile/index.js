import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Layout, Avatar, Row, Col } from 'antd';

import './UserProfile.css';

function UserProfile() {
  const content = useSelector((state) => state); //this hook gives us redux store state
  const { Header, Footer, Content } = Layout;

  return (
    <div>
      <Layout className='h_100vh'>
        <Header>
          <h1 className='c_white'>User Profile</h1>
        </Header>
        <Content>
          <Row type='flex' justify='center' align='middle' className='h_100per'>
            <div>
              <Col className='mgb_10vh'>
                <Avatar size={64} icon='user' />
              </Col>
              <Col justify='center'>
                <p className='p_break'>{content.infoStatus.userAddress}</p>
              </Col>
              <Col>
                <p>{content.infoStatus.balance} TOMO</p>
              </Col>
            </div>
          </Row>
        </Content>
        <Footer>
          <Button type='primary'>
            <Link to='/'>Back</Link>
          </Button>
        </Footer>
      </Layout>
    </div>
  );
}

export default UserProfile;
