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

const NewTimer = (props) => {
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
          onChange={ props.changeTime }
        />
        <button type="button"
                className="btn btn-primary ml-2"
                onClick={ props.saveTimer }>
          Add timer
        </button>
        <br/>
        {props.newTimerData.days.map((day) => {
          return (
            <NewTimerDay key={ day.key }
                         timer={ props.newTimerData }
                         day={ day }
                         onChangeAlarm={ props.changeAlarm }/>
        )})}
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
            return (<li key={ timer.id } className="list-group-item">
              { timer.time }
              <br/>
              {timer.days.map((day) => {
                return (
                  <TimerDay key={ day.key }
                            timer={ timer }
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
  const id = "new-timer-" + props.day.key;
  return (
    <div className="custom-control custom-checkbox custom-control-inline mt-2">
      <input type="checkbox"
             className="custom-control-input"
             id={ id }
             onChange={ () =>  props.onChangeAlarm(props.day.key) }
             defaultChecked={ false }/>
      <label className="custom-control-label"
             htmlFor={ id } >{ props.day.displayname }</label>
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
  static initialNewTimerState = () => ({
    'newTimerData': {
      'id': 0,
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
          'displayname': 'Fri',
          'alarm': false,
        },
        {
          'key': 'saturday',
          'displayname': 'Sat',
          'alarm': false,
        },
        {
          'key': 'sunday',
          'displayname': 'Sun',
          'alarm': false,
        },
      ]
    }
  });
  resetNewTimer = () => this.setState(App.initialNewTimerState());
  state = {
    color: '#fff',
    timers: [],
    'newTimerData': {
      'id': 0,
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
          'displayname': 'Fri',
          'alarm': false,
        },
        {
          'key': 'saturday',
          'displayname': 'Sat',
          'alarm': false,
        },
        {
          'key': 'sunday',
          'displayname': 'Sun',
          'alarm': false,
        },
      ]
    }
  };

  changeAlarm = (day) => {
    this.setState(prevState => {
      let newTimerData = prevState.newTimerData;
      newTimerData.days.find((o, i) => {
        if (o.key === day) {
          newTimerData.days[i]['alarm'] = !newTimerData.days[i]['alarm'];
          return true;
        }
      });
      return {
        'newTimerData': newTimerData
      };
    });
  };

  changeTime = (time) => {
    this.setState(prevState => {
      let newTimerData = prevState.newTimerData;
      newTimerData['time'] = time.format('HH:mm');
      return {
        'newTimerData': newTimerData
      };
    });
  };

  saveTimer = () => {
    this.addTimer(this.state.newTimerData);
    this.resetNewTimer();
  };

  handleColorChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  addTimer = (timerData) => {
    this.setState((prevState) => {
      timerData['id'] = prevState.timers.length;
      return { timers: [...prevState.timers, timerData] }
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Home Control</h3>
        <hr />
        <Color onChangeComplete={ this.handleColorChangeComplete }
               selectedColor={ this.state.color }/>
        <NewTimer newTimerData={ this.state.newTimerData }
                  onAddTimer={ this.addTimer }
                  changeAlarm={ this.changeAlarm }
                  changeTime={ this.changeTime }
                  saveTimer={ this.saveTimer }/>
        <TimerList timers={ this.state.timers }/>
      </div>
    );
  };
}

export default App;
