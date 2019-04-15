import React from 'react';
import Track from './Track';

import './DrumMachineContainer.css';

export const DrumMachineContainer = (props) => {
  return (
    <div className="drumMachineContainer">
        {props.children}
    </div>
  )
}


export default DrumMachineContainer;