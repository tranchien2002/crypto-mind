import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function UserProfile() {
  const content = useSelector((state) => state); //this hook gives us redux store state

  return (
    <div>
      <h1>User Profile</h1>
      <p>{content.infoStatus.userAddress}</p>
      <p>{content.infoStatus.balance}</p>
      <Button type='primary'>
        <Link to='/'>Back</Link>
      </Button>
    </div>
  );
}

export default UserProfile;
