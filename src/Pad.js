import React from 'react';


import './DrumMachineContainer.css';

export const Pad = ({padNumber, currentPad}) => {
    let currentPadStyle;
    if(currentPad) {
        currentPadStyle = {background: 'yellow'}
    }
  return (
    <div style={currentPadStyle} data-pad-number={padNumber} className="pad">
    </div>
  )
}


export default Pad;