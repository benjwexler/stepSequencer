import React from "react";
import "./DrumMachineContainer";
import { AppProvider, AppConsumer } from "./AppContext";
import Track from "./Track";
import Pad from "./Pad";
import PadConsumer from "./PadConsumer";

import "./App.css";
import { DrumMachineContainer } from "./DrumMachineContainer";

var context;
var dogBarkingBuffer = null;
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.initiateOnce = 0;
    this.state = {
      currentPad: 1,
      track1: {
        name: "Kick",
        soundfile: './Kick2.wav',
        padsOn: {},
      },
    };
    this.loadDogSound = this.loadDogSound.bind(this);
  }

  sequence = () => {
    console.log("test");
    let currentPad = this.state.currentPad + 1;
    if (currentPad === 9) {
      currentPad = 1;
    }
    // this.loadDogSound('./Kick2.wav')
    this.setState({
      currentPad: currentPad
    });
  };

  setPadsOn = (padNum) => {
    let track1 = {...this.state.tracks1}
    let currentPadsOn = {...this.state.track1.padsOn};
    
    if( !this.state.track1.padsOn[padNum]) {
      currentPadsOn[padNum] = true;
      track1.padsOn = currentPadsOn
    } else {
      currentPadsOn[padNum] = false;
      track1.padsOn = currentPadsOn
      
    }
    this.setState({
      track1: track1
    })
  }


  // var context;



loadDogSound = (url) => {
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

       





  
    
// 
    // setInterval(this.sequence, 1000);
  }

  render() {
    let that = this;
    return (
      // We wrap all of the components that need access
      // to the lastName property in FamilyProvider.
      <AppProvider value={{state: this.state, playSound: this.loadDogSound, setPadsOn: this.setPadsOn}}>
        <DrumMachineContainer>
          <TrackConsumer />
        </DrumMachineContainer>
      </AppProvider>
    );
  }
}



const TrackConsumer = () => {
  return (
    <AppConsumer>
      {context => <Track trackName={context.state.track1.name} />}
    </AppConsumer>
  );
};
