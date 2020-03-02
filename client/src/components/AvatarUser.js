import React from 'react';
import { Avatar } from 'antd';

function AvatarUser({ size, icon, address }) {
  let avtSrc = 'https://robohash.org/' + address + '?set=set4';
  return (
    <div>
      <Avatar src={avtSrc} size={size} icon={icon} />
    </div>
  );
}

export default AvatarUser;
