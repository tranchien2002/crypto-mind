import React from 'react';
import './PixelButton.css';

function PixelButton({ title, type, size }) {
  return (
    <div className='test'>
      <button className={`pixel ${type} ${size}`}>{title}</button>
    </div>
  );
}

export default PixelButton;
