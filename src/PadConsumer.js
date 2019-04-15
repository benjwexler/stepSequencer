import React from 'react';
import { AppProvider, AppConsumer } from "./AppContext";
import Pad from "./Pad";

export const PadConsumer = ({padNumber}) => {
    return <AppConsumer>{context => {
        console.log(context.currentPad, padNumber)
        return (<Pad padNumber={padNumber} currentPad={padNumber === context.currentPad}/>)}
    }</AppConsumer>;
  }