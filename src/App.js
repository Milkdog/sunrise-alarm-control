import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from "firebase";

class App extends Component {
  constructor() {
    super()

    this.state = {
      alarmActive: false,
      sunriseHour: 0,
      sunriseMin: 0,
      sunriseLength: 0,
    }

    const config = {
      apiKey: "AIzaSyChM_PAA9_710pv6PT5Z-Mnm7FcquCpHqg",
      authDomain: "sunrise-alarm-2e351.firebaseapp.com",
      databaseURL: "https://sunrise-alarm-2e351.firebaseio.com",
      projectId: "sunrise-alarm-2e351",
      storageBucket: "sunrise-alarm-2e351.appspot.com",
      messagingSenderId: "60454247513"
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    firebase.database().ref('/60:01:94:51:C1:F3/alarm').on('value', (snapshotData) => {
      if (snapshotData.val()) {
        this.setState(snapshotData.val())
      }
    })

  }

  saveData(event) {
    firebase.database().ref('/60:01:94:51:C1:F3/alarm').update({
      [event.target.name]: event.target.value ? parseInt(event.target.value, 10) : 0
    })
  }

  saveTime(event) {
    const [sunriseHour, sunriseMin] = event.target.value.split(':')

    firebase.database().ref('/60:01:94:51:C1:F3/alarm').update({
      sunriseHour: parseInt(sunriseHour, 10),
      sunriseMin: parseInt(sunriseMin, 10),
    })
  }

  toggleAlarmActive() {
    console.log('Toggle Alarm')
    firebase.database().ref('/60:01:94:51:C1:F3/alarm').update({
      alarmActive: !this.state.alarmActive,
    })
  }

  pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }

    return str;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sunrise Lamp</h1>
        </header>
        <div>
          Alarm Active <input type="checkbox" checked={ this.state.alarmActive } onChange={ this.toggleAlarmActive.bind(this) } />
        </div>
        <div>
          Sunrise Start <input type="time" name="sunriseStart" value={ `${this.pad(this.state.sunriseHour, 2)}:${this.pad(this.state.sunriseMin, 2)}`} onChange={ this.saveTime.bind(this) } />
        </div>
        <div>
          Length <input type="number" min="1" max="59" name="sunriseLength" value={ this.state.sunriseLength } onChange={ this.saveData.bind(this) } />
        </div>
      </div>
    );
  }
}

export default App;
