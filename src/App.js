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
      tempo: 80,
      noteDivision: 16,
      currentPad: 1,
      tracks: {
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
        "track3": {
          name: "Hat",
          soundfile: "./hat.wav",
          padsOn: {}
        }, 
      }
    };
    this.loadDogSound = this.loadDogSound.bind(this);
  }

  sequence = () => {
    let currentPad = this.state.currentPad + 1;
    if (currentPad > this.state.noteDivision) {
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
        that.interval = setInterval(that.sequence, (60000) / (that.state.tempo * (that.state.noteDivision/4)) );
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let that = this;
    if (prevState.tempo !== this.state.tempo || prevState.noteDivision !== this.state.noteDivision) {
      clearInterval(this.interval);
      this.interval = setInterval(that.sequence, (60000) / (that.state.tempo * (that.state.noteDivision/4)) );
    }
  }

  handleTempoChange = (e) => {
    this.setState({ tempo: Number(e.target.value) });
    console.log("TRYING TO CHANGE TEMPO")
  }

  handleNoteDivisionChange = (e) => {
    this.setState({ noteDivision: Number(e.target.innerText) });
    console.log("TRYING TO CHANGE Note Division")
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
          setPadsOn: this.setPadsOn,
          handleTempoChange: this.handleTempoChange,
        }}
      >
      
       {/* <input value={this.state.tempo} onChange={this.handleTempoChange} /> */}
        <DrumMachineContainer>
          <TrackConsumer />
        </DrumMachineContainer>
        <input type="range" min="20" max="200" value={this.state.tempo} class="slider" id="myRange" onChange={this.handleTempoChange} />
        <button onClick={this.handleNoteDivisionChange}>8</button>
        <button onClick={this.handleNoteDivisionChange}>16</button>
        <button onClick={this.handleNoteDivisionChange}>32</button>
      </AppProvider>
    );
  }
}

const TrackConsumer = () => {
  let that = this

  return (
    <AppConsumer>
      {context => {

    let tracksArr = Object.keys(context.state.tracks);

    let tracks = tracksArr.map((track, i) => {
      return <Track padsOn={context.state.tracks[`track${i+1}`].padsOn} noteDivision={context.state.noteDivision} trackNum={`track${i+1}`} trackName={context.state.tracks[`track${i+1}`].name} />
    })

        return (
          <div style={{ width: "100%" }}>

           {tracks}
          </div>
        );
      }}
    </AppConsumer>
  );
};
