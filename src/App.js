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

let timerId = 0;
const timerDefault = {
  'id': timerId,
  'time': '00:00',
  'days': [
    {
      'key': 'monday',
      'displayname': 'Mon',
      'alarm': false,
    },
    {
      'key': 'tuesday',
      'displayname': 'Tue',
      'alarm': false,
    },
    {
      'key': 'wednesday',
      'displayname': 'Wed',
      'alarm': false,
    },
    {
      'key': 'thursday',
      'displayname': 'Thu',
      'alarm': false,
    },
    {
      'key': 'friday',
      'displayname': 'fri',
      'alarm': false,
    },
    {
      'key': 'saturday',
      'displayname': 'sat',
      'alarm': false,
    },
    {
      'key': 'sunday',
      'displayname': 'sun',
      'alarm': false,
    },
  ]
};

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
        <button type="button"
                className="btn btn-primary ml-2"
                onClick={ props.addTimer }>
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
              {timer.days.map((day) => {
                return (
                  <TimerDay timer={ timer }
                            day={ day }/>
              )})}
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
  const id = props.timer.id + "-timer-" + props.day.key;
  return (
    <div className="custom-control custom-checkbox custom-control-inline mt-2">
      <input type="checkbox"
             className="custom-control-input"
             id={ id }
             checked={ props.day.alarm }
             readOnly />
      <label className="custom-control-label"
             htmlFor={ id } >{ props.day.displayname }</label>
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
        'days': [
          {
            'key': 'monday',
            'displayname': 'Mon',
            'alarm': true,
          },
          {
            'key': 'tuesday',
            'displayname': 'Tue',
            'alarm': true,
          },
          {
            'key': 'wednesday',
            'displayname': 'Wed',
            'alarm': true,
          },
          {
            'key': 'thursday',
            'displayname': 'Thu',
            'alarm': true,
          },
          {
            'key': 'friday',
            'displayname': 'fri',
            'alarm': true,
          },
          {
            'key': 'saturday',
            'displayname': 'sat',
            'alarm': false,
          },
          {
            'key': 'sunday',
            'displayname': 'sun',
            'alarm': false,
          },
        ]
      },
      {
        'id': 1,
        'time': '15:30',
        'days': [
          {
            'key': 'monday',
            'displayname': 'Mon',
            'alarm': false,
          },
          {
            'key': 'tuesday',
            'displayname': 'Tue',
            'alarm': true,
          },
          {
            'key': 'wednesday',
            'displayname': 'Wed',
            'alarm': false,
          },
          {
            'key': 'thursday',
            'displayname': 'Thu',
            'alarm': true,
          },
          {
            'key': 'friday',
            'displayname': 'fri',
            'alarm': true,
          },
          {
            'key': 'saturday',
            'displayname': 'sat',
            'alarm': true,
          },
          {
            'key': 'sunday',
            'displayname': 'sun',
            'alarm': false,
          },
        ]
      }
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
