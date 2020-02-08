import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Avatar, Statistic, Button, Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './trainingMode.css';

const { Header, Content, Footer } = Layout;

function TrainingMode() {
  const targetTime = new Date().getTime() + 15000;
  const { Countdown } = Statistic;
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
            <Col span={24}>
              <Countdown title='Timer' value={targetTime} format='mm:ss' />
            </Col>
            <Col span={24}>
              <p>
                Question <span>{content.infoStatus.numberQuestion}</span>
              </p>
            </Col>
            <Col span={22}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              {/* <p>{content.infoStatus.question}</p> */}
            </Col>
            <Col span={22}>
              <Button>A</Button>
            </Col>

            <Col span={22}>
              <Button>B</Button>
            </Col>

            <Col span={22}>
              <Button>C</Button>
            </Col>

            <Col span={22}>
              <Button>D</Button>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default TrainingMode;
