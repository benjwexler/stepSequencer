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

    loadDogSound = (url) => {
      console.log("Hey")
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
    
      // Decode asynchronously
      request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
          dogBarkingBuffer = buffer;
          var source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);
        });
      }
      request.send();
    }

    togglePad = () => {
      // this.loadDogSound('./Kick2.wav')
      console.log(this.props.padNumber)
      this.setPadsOn(this.props.padNumber)
      this.playSound('./Kick2.wav')
      this.setState({
        padOn: !this.state.padOn
      })
    }

    componentDidMount() {
      let that = this
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector('.nameCol').addEventListener('click', function() {
              window.AudioContext = window.AudioContext||window.webkitAudioContext;
          context = new AudioContext();
            console.log('Playback resumed successfully');
            setInterval(that.sequence, 1000);
            // that.loadDogSound('./HornLine.mp3')
          });
      });
    }


render(props) {
  console.log(this.props)
console.log(trackInfo);
let {padNumber, currentPad, trackInfo} = this.props;
  

    let currentPadStyle;
    let padOnStyle;
    if(currentPad) {
        currentPadStyle = {border: '2px solid green'}
    }

    if(this.state.padOn) {
      padOnStyle = {background: 'yellow'}
  }
  return (
    <div  onClick={() => this.togglePad()} style={{...currentPadStyle, ...padOnStyle}} data-pad-number={padNumber} className="pad">
    </div>
  )
}
  };


// export default Pad;