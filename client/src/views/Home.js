import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Select Game Mode</h1>
      <Button type='primary'>
        <Link to='/Profile'>Profile</Link>
      </Button>
    </div>
  );
}

export default Home;
