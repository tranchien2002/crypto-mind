import React from 'react';
import { Row, Col, Radio } from 'antd';

import './createGame.css';

function CreateGame({ bounty, setBounty, roomSize, setRoomSize, blockTimeout, setBlockTimeout }) {
  return (
    <div>
      <Row type='flex' justify='center' align='middle'>
        <p className='p_break'>Room Information</p>
      </Row>
      <Col>
        <Col>
          <p>Total Players</p>
          <Radio.Group
            className='w_100per'
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
          >
            <Row type='flex' justify='space-around'>
              <Radio.Button value='2'>2</Radio.Button>
              <Radio.Button value='3'>3</Radio.Button>
              <Radio.Button value='5'>5</Radio.Button>
            </Row>
          </Radio.Group>
        </Col>

        <Col>
          <p>Time for each question</p>
          <Radio.Group
            className='w_100per'
            value={blockTimeout}
            onChange={(e) => setBlockTimeout(e.target.value)}
          >
            <Row type='flex' justify='space-around'>
              <Radio.Button value='6'>6</Radio.Button>
              <Radio.Button value='10'>10</Radio.Button>
              <Radio.Button value='12'>12</Radio.Button>
            </Row>
          </Radio.Group>
        </Col>

        <Col>
          <p>Bet (TOMO)</p>
          <Radio.Group
            className='w_100per'
            value={bounty}
            onChange={(e) => setBounty(e.target.value)}
          >
            <Row type='flex' justify='space-around'>
              <Radio.Button value='3'>3</Radio.Button>
              <Radio.Button value='5'>5</Radio.Button>
              <Radio.Button value='10'>10</Radio.Button>
            </Row>
          </Radio.Group>
        </Col>
      </Col>
    </div>
  );
}

export default CreateGame;
