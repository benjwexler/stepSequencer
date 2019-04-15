import React from "react";
import "./DrumMachineContainer";
import { AppProvider, AppConsumer } from "./AppContext";
import Track from "./Track";
import Pad from "./Pad";
import PadConsumer from "./PadConsumer";

import "./App.css";
import { DrumMachineContainer } from "./DrumMachineContainer";



export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.initiateOnce = 0;
    this.state = {
      currentPad: 1,
      track1: {
        name: "Kick",
        soundfile: undefined,
        context: undefined,
        gainNode: undefined,
        playSound: this.playSound('1', './kick2.wav')
      }
    };
  }

  sequence = () => {
    console.log("test");
    let currentPad = this.state.currentPad + 1;
    if (currentPad === 9) {
      currentPad = 1;
    }
    this.setState({
      currentPad: currentPad
    });
  };

  initiateAudioContext = () => {

    let that = this

    if (that.initiateOnce === 0) {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        window["AudioContext"] = window.AudioContext || window.webkitAudioContext;

        let context = new AudioContext();
        window["context"] = new AudioContext()
        window["gainNode"] = context.createGain();
        let gainNode = context.createGain();


        that.setState({
            context: context,
            gainNode: gainNode

        }, () => {

          console.log(this.state)
          

        }
        
        )

        that.initiateOnce = 1

    } else {
        window.removeEventListener("mouseover", this.initiateAudioContext)
    }
}

playSound = (number, soundFile) => {
  let that = this;
  let gainNode = that.state.gainNode;
  window[`bufferNode${number}`] = that.state.context.createBufferSource();

  var request = new XMLHttpRequest();
  request.open('GET', soundFile, true);
  request.responseType = 'arraybuffer';
  console.log(that.state.context)
  request.onloadend = function () {

    console.log(request)
     that.state.context.decodeAudioData(
          request.response,
          function (buffer) {
              // window[`bufferNode${number}`].buffer = buffer;
              // window[`bufferNode${number}`].connect(gainNode);
              // gainNode.connect(that.state.context.destination);
              // gainNode.gain.setValueAtTime(1, that.state.context.currentTime);
              // window[`bufferNode${number}`].start()
          },
          function (e) { console.log("Error with decoding audio data" + e.err); }
      );
  };
  request.send()
  
};
  

  componentDidMount() {
    console.log("Hi");
    window.addEventListener("mouseover", this.initiateAudioContext)
   


  
    

    // setInterval(this.sequence, 1000);
  }

  render() {
    return (
      // We wrap all of the components that need access
      // to the lastName property in FamilyProvider.
      <AppProvider value={this.state}>
        <DrumMachineContainer>
          <TrackConsumer />
        </DrumMachineContainer>
      </AppProvider>
    );
  }
}

// const DrumMachineContainer = () => {
//   return <AppConsumer>{context => <Track trackName="Kick"/>}</AppConsumer>;
// };

const TrackConsumer = () => {
  return (
    <AppConsumer>
      {context => <Track onClick={context.playSound} trackName={context.track1.name} />}
    </AppConsumer>
  );
};
