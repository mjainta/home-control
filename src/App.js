import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { CirclePicker, ChromePicker } from 'react-color';

import moment from 'moment';
import TimePicker from 'rc-time-picker';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faTrash, faClock } from '@fortawesome/free-solid-svg-icons'

import Timer from './Timer';
import fire from './fire';

library.add(faIgloo, faTrash, faClock)

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
      <FontAwesomeIcon icon={ faClock } /> <TimePicker
          style={{ width: 60 }}
          showSecond={ false }
          defaultValue={ moment() }
          className="timepicker"
          onChange={ props.changeTime }
        />
        <button type="button"
                className="btn btn-primary ml-2"
                onClick={ props.saveTimer }>
          Add timer
        </button>
        <br/>
        {props.newTimer.data.days.map((day) => {
          return (
            <NewTimerDay key={ day.key }
                         timer={ props.newTimer.data }
                         day={ day }
                         onChangeAlarm={ props.changeAlarm }
                         alarm={ day.alarm }/>
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
              <FontAwesomeIcon icon={ faClock } /> { timer.time }
              <br/>
              {timer.days.map((day) => {
                return (
                  <TimerDay key={ day.key }
                            timer={ timer }
                            day={ day }/>
              )})}
              <button type="button"
                      className="btn btn-danger ml-2"
                      onClick={ () => props.deleteTimer(timer.id) }>
                <FontAwesomeIcon icon={ faTrash } />
              </button>
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
             checked={ props.alarm } />
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
    'newTimer': new Timer(),
  });
  resetNewTimer = () => this.setState(App.initialNewTimerState());
  state = {
    color: '#fff',
    timers: [],
    'newTimer': new Timer(),
    'fetchedTimers': false,
  };

  fetchTimers = () => {
    fire.firestore().collection('timer').get().then((querySnapshot) => {
        let timers = [];
        querySnapshot.forEach(function(doc) {
            timers.push(doc.data());
        });
        this.setState({
          timers: timers,
          fetchedTimers: true,
        });
    });
  }

  changeAlarm = (day) => {
    this.setState((prevState) => {
      this.state.newTimer.switchAlarm(day);
      return { }
    });
  };

  changeTime = (time) => {
    this.state.newTimer.changeTime(time);
    this.setState((prevState) => {
      return { }
    });
  };

  saveTimer = () => {
    this.addTimer(this.state.newTimerData);
    this.resetNewTimer();
  };

  handleColorChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  addTimer = () => {
    this.state.newTimer.save();
    this.fetchTimers();
  };

  deleteTimer = (timerId) => {
    fire.firestore().collection('timer').doc(timerId).delete()
    .then(() => {
      this.fetchTimers();
    });
  };

  render() {
    if (!this.state.fetchedTimers) {
      this.fetchTimers();
    }

    return (
      <div className="container">
        <h3>Home Control</h3>
        <hr />
        <Color onChangeComplete={ this.handleColorChangeComplete }
               selectedColor={ this.state.color }/>
        <NewTimer newTimer={ this.state.newTimer }
                  changeAlarm={ this.changeAlarm }
                  changeTime={ this.changeTime }
                  saveTimer={ this.saveTimer }/>
        <TimerList timers={ this.state.timers }
                   deleteTimer={ this.deleteTimer }/>
      </div>
    );
  };
}

export default App;
