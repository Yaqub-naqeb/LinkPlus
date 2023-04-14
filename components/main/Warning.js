import React from 'react';

function Warning({ message }) {
  return (
    <div style={{ backgroundColor: 'yellow', padding: '10px', border: '1px solid orange' }}>
      {message}
    </div>
  );
}

export default Warning;