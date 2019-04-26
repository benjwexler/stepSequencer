import React from 'react';
import Pad from './Pad';
import {PadConsumer} from "./PadConsumer";


import './DrumMachineContainer.css';

export const Track = (props) => {
  return (
    <div onClick={props.onClick} className="track">
        <div className="nameCol">{props.trackName}</div>
          <PadConsumer trackNum={props.trackNum} padNumber={1}/>
          <PadConsumer trackNum={props.trackNum} padNumber={2}/>
          <PadConsumer trackNum={props.trackNum} padNumber={3}/>
          <PadConsumer trackNum={props.trackNum} padNumber={4}/>
          <PadConsumer trackNum={props.trackNum} padNumber={5}/>
          <PadConsumer trackNum={props.trackNum} padNumber={6}/>
          <PadConsumer trackNum={props.trackNum} padNumber={7}/>
          <PadConsumer trackNum={props.trackNum} padNumber={8}/>
    </div>
  )
}


export default Track;