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
      // track1: {
      //   name: "Kick",
      //   soundfile: "./Kick2.wav",
      //   padsOn: {}
      // },
      // track2: {
      //   name: "Snare",
      //   soundfile: "./snare2.wav",
      //   padsOn: {}
      // },
      tracks: {
        // {
        //   trackNum: 1,
        //   name: "Kick",
        //   soundfile: "./Kick2.wav",
        //   padsOn: {}
        // },
        // {
        //   trackNum: 2,
        //   name: "Snare",
        //   soundfile: "./snare2.wav",
        //   padsOn: {}
        // },

        "track1": {
          name: "Kick",
          soundfile: "./Kick2.wav",
          padsOn: {}
        }, 
        "track2": {
          name: "Snare",
          soundfile: "./snare2.wav",
          padsOn: {}
        }, 
      }
    };
    this.loadDogSound = this.loadDogSound.bind(this);
  }

  sequence = () => {
    let currentPad = this.state.currentPad + 1;
    if (currentPad === 9) {
      currentPad = 1;
    }

    let tracks = {...this.state.tracks};
    let tracksArr = Object.keys(tracks);

    tracksArr.forEach((track, i) => {
        if(tracks[`track${i+1}`].padsOn[currentPad]) {
          this.loadDogSound(tracks[`track${i+1}`].soundfile);
        }
    })


    this.setState({
      currentPad: currentPad
    });
  };

  setPadsOn = (padNum, trackNum) => {

    let tracks = {...this.state.tracks};

     if (tracks[trackNum].padsOn[padNum]) {
      tracks[trackNum].padsOn[padNum] = undefined;
    } else {
      tracks[trackNum].padsOn[padNum] = true;
    }

    this.setState({
      tracks: tracks
    });
  };



  loadDogSound = url => {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        dogBarkingBuffer = buffer;
        var source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer; // tell the source which sound to play
        source.connect(context.destination); // connect the source to the context's destination (the speakers)
        source.start(0);
      });
    };
    request.send();
  };

  componentDidMount() {
    let that = this;
    document.addEventListener("DOMContentLoaded", function() {
      document.querySelector(".nameCol").addEventListener("click", function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
        // console.log('Playback resumed successfully');
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
      <AppProvider
        value={{
          state: this.state,
          playSound: this.loadDogSound,
          setPadsOn: this.setPadsOn
        }}
      >
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
      {context => {
        return (
          <div style={{ width: "100%" }}>
            <Track trackNum={"track1"} trackName={context.state.tracks["track1"].name} />
            <Track trackNum={"track2"} trackName={context.state.tracks["track2"].name} />
          </div>
        );
      }}
    </AppConsumer>
  );
};
