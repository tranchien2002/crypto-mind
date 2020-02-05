import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const content = useSelector((state) => state); //this hook gives us redux store state

  return (
    <div>
      <h1>Select Game Mode</h1>
      <p>{content.infoStatus.userAddress}</p>
    </div>
  );
}

export default Home;
