import React from 'react';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';

function AvatarUser({ size, icon, playerAddress }) {
  const infoStatus = useSelector((state) => state.infoStatus);
  let avtSrc;
  playerAddress
    ? (avtSrc = 'https://robohash.org/' + playerAddress + '?set=set4')
    : (avtSrc = 'https://robohash.org/' + infoStatus.userAddress + '?set=set4');

  return (
    <div>
      <Avatar src={avtSrc} size={size} icon={icon} />
    </div>
  );
}

export default AvatarUser;
