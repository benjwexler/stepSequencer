import React from 'react';
import { AppProvider, AppConsumer } from "./AppContext";
import Pad from "./Pad";

export const PadConsumer = ({padNumber, trackNum}) => {
    return <AppConsumer>{context => {
        {/* console.log(context.state.currentPad, padNumber)
        console.log(context); */}
        return (<Pad setPadsOn={context.setPadsOn} playSound={context.playSound} trackInfo={context.state} trackNum={trackNum} padNumber={padNumber} currentPad={padNumber === context.state.currentPad}/>)}
    }</AppConsumer>;
  }