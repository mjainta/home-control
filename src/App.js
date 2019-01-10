import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { CirclePicker, ChromePicker } from 'react-color';

import moment from 'moment';
import TimePicker from 'rc-time-picker';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

const Color = (props) => {
  return (
    <div className="card mb-3">
      <div className="card-header"
           style={ {backgroundColor: props.selectedColor} }>
        <b>LED status</b>
      </div>
      <div className="card-body">
        <h5 className="card-title">Change LED color</h5>
        <CirclePicker onChangeComplete={ props.onChangeComplete }
                      color={ props.selectedColor }/>
      </div>
    </div>
  );
}

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
function onChange(value) {
  console.log(value && value.format(str));
}

const Timer = (props) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <b>New Timer</b>
      </div>
      <div className="card-body">
        <TimePicker
          style={{ width: 60 }}
          showSecond={ false }
          defaultValue={moment()}
          className="timepicker"
          onChange={onChange}
        />
        <button type="button" className="btn btn-primary ml-2">
          Add timer
        </button>
        <br/>
        <NewTimerDay day={ "Mon" }/>
        <NewTimerDay day={ "Tue" }/>
        <NewTimerDay day={ "Wed" }/>
        <NewTimerDay day={ "Thu" }/>
        <NewTimerDay day={ "Fri" }/>
        <NewTimerDay day={ "Sat" }/>
        <NewTimerDay day={ "Sun" }/>
      </div>
    </div>
  );
}

const TimerList = (props) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <b>Saved Timers</b>
      </div>
      <div className="card-body p-0">
        <ul className="list-group">
          {props.timers.map((timer) => {
            return (<li className="list-group-item">
              { timer.time }
              <br/>
              <TimerDay timer={ timer }
                        day={ "Mon" }
                        alarm={ timer.mon }/>
              <TimerDay timer={ timer }
                        day={ "Tue" }
                        alarm={ timer.tue }/>
              <TimerDay timer={ timer }
                        day={ "Wed" }
                        alarm={ timer.wed }/>
              <TimerDay timer={ timer }
                        day={ "Thu" }
                        alarm={ timer.thu }/>
              <TimerDay timer={ timer }
                        day={ "Fri" }
                        alarm={ timer.fri }/>
              <TimerDay timer={ timer }
                        day={ "Sat" }
                        alarm={ timer.sat }/>
              <TimerDay timer={ timer }
                        day={ "Sun" }
                        alarm={ timer.sun }/>
            </li>
          )})}
        </ul>
      </div>
    </div>
  );
}

const NewTimerDay = (props) => {
  const id = "new-timer-" + props.day;
  return (
    <div className="custom-control custom-checkbox custom-control-inline mt-2">
      <input type="checkbox"
             className="custom-control-input"
             id={ id } />
      <label className="custom-control-label"
             htmlFor={ id } >{ props.day }</label>
    </div>
  );
}

const TimerDay = (props) => {
  const id = props.timer.id + "-timer-" + props.day;
  return (
    <div className="custom-control custom-checkbox custom-control-inline mt-2">
      <input type="checkbox"
             className="custom-control-input"
             id={ id }
             checked={ props.alarm }
             readOnly />
      <label className="custom-control-label"
             htmlFor={ id } >{ props.day }</label>
    </div>
  );
}


class App extends Component {
  state = {
    color: '#fff',
    timers: [
      {
        'id': 0,
        'time': '06:00',
        'mon': true,
        'tue': true,
        'wed': true,
        'thu': true,
        'fri': true,
        'sat': false,
        'sun': false,
      },
      {
        'id': 1,
        'time': '15:30',
        'mon': false,
        'tue': true,
        'wed': true,
        'thu': false,
        'fri': true,
        'sat': false,
        'sun': true,
      },
    ]
  };

  handleColorChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div className="container">
        <h3>Home Control</h3>
        <hr />
        <Color onChangeComplete={ this.handleColorChangeComplete }
               selectedColor={ this.state.color }/>
        <Timer />
        <TimerList timers={ this.state.timers }/>
      </div>
    );
  };
}

export default App;
