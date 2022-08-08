import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  playSound(e) {
    const sound = document.getElementById(this.props.keyName);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.tracks.replace(/-/g, " "));
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  render() {
    return (
      <button
        className="drum-pad"
        onClick={this.playSound}
        id={this.props.tracks}
      >
        <p>{this.props.keyName}</p>
        <audio
          src={this.props.url}
          tracks={this.props.tracks}
          className="clip"
          id={this.props.keyName}
          updateDisplay={this.props.updateDisplay}
        />
      </button>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumpads: [
        {
          keyCode: 81,
          keyString: "Q",
          sound: "Heater-1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
          keyCode: 87,
          keyString: "W",
          sound: "Heater-2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
          keyCode: 69,
          keyString: "E",
          sound: "Heater-3",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
          keyCode: 65,
          keyString: "A",
          sound: "Heater-4",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
          keyCode: 83,
          keyString: "S",
          sound: "Heater-6",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
          keyCode: 68,
          keyString: "D",
          sound: "Dsc_Oh",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
          keyCode: 90,
          keyString: "Z",
          sound: "Kick_n_Hat",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
          keyCode: 88,
          keyString: "X",
          sound: "RP4_KICK_1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
          keyCode: 67,
          keyString: "C",
          sound: "Cev_H2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
      ],
      display: "Kick it!"
    };
    this.displaySoundName = this.displaySoundName.bind(this);
  }

  displaySoundName(name) {
    this.setState({
      display: name
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="background-display">
          <p id="display">{this.state.display}</p>
        </div>
        <div id="drumpad-container">
          {this.state.drumpads.map(item => (
            <DrumPad
              keyCode={item.keyCode}
              keyName={item.keyString}
              tracks={item.sound}
              url={item.url}
              updateDisplay={this.displaySoundName}
            />
          ))}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <DrumMachine />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);