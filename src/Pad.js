import React, { useState } from 'react';


import './DrumMachineContainer.css';


// export const Pad = ({padNumber, currentPad, trackInfo}) => {
  var context;
  var dogBarkingBuffer = null;
  export default class Pad  extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        padOn: false,
      };
      this.togglePad = this.togglePad.bind(this)
      this.playSound = this.props.playSound.bind(this)
      this.setPadsOn = this.props.setPadsOn.bind(this)

    }

 

    togglePad = () => {
      // this.loadDogSound('./Kick2.wav')
      console.log(this.props.padNumber)
      console.log(this.props.trackNum)
      this.setPadsOn(this.props.padNumber, this.props.trackNum)
      // this.playSound('./Kick2.wav')
      this.setState({
        padOn: !this.state.padOn
      })
    }

    componentDidMount() {
    //   let that = this
    // document.addEventListener("DOMContentLoaded", function () {
    //   document.querySelector('.nameCol').addEventListener('click', function() {
    //           window.AudioContext = window.AudioContext||window.webkitAudioContext;
    //       context = new AudioContext();
    //         // console.log('Playback resumed successfully');
    //         setInterval(that.sequence, 1000);
    //         // that.loadDogSound('./HornLine.mp3')
    //       });
    //   });
    }


render(props) {
//   console.log(this.props)
// console.log(trackInfo);
let {padNumber, currentPad, padOn, trackInfo} = this.props;

    let currentPadStyle;
    let padOnStyle;
    if(currentPad) {
        currentPadStyle = {border: '2px solid green'}
    }

    if(padOn) {
      padOnStyle = {background: 'yellow'}
  }

  if(currentPad && padOn) {
    padOnStyle = {background: '#64D8D7'}
  }
  return (
    <div  onClick={() => this.togglePad()} style={{...currentPadStyle, ...padOnStyle}} data-pad-number={padNumber} className="pad">
    </div>
  )
}
  };


// export default Pad;