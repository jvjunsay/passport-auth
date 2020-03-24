import React from 'react';
import requireAuth from './requireAuth';

function Feature () {
  return (
    <div>
      <h3>Featyre</h3>
    </div>
  );
}

export default requireAuth(Feature);
