import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AvatarUser from 'components/AvatarUser';
import { Layout, Row, Col } from 'antd';

import './UserProfile.css';
import PixelButton from 'components/PixelButton';

function UserProfile() {
  const content = useSelector((state) => state); //this hook gives us redux store state
  const { Header, Footer, Content } = Layout;
  let history = useHistory();

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
                <AvatarUser address={content.infoStatus.userAddress} size={64} icon='user' />
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
          <div className='ft_size' onClick={() => history.goBack()}>
            <PixelButton title='Back' type='danger' size='large' />
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default UserProfile;
