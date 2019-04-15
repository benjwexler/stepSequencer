import React from 'react';
import Pad from './Pad';
import {PadConsumer} from "./PadConsumer";


import './DrumMachineContainer.css';

export const Track = (props) => {
  return (
    <div onClick={props.onClick} className="track">
        <div className="nameCol">{props.trackName}</div>
          <PadConsumer padNumber={1}/>
          <PadConsumer padNumber={2}/>
          <PadConsumer padNumber={3}/>
          <PadConsumer padNumber={4}/>
          <PadConsumer padNumber={5}/>
          <PadConsumer padNumber={6}/>
          <PadConsumer padNumber={7}/>
          <PadConsumer padNumber={8}/>
    </div>
  )
}


export default Track;