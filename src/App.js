import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { CirclePicker, ChromePicker } from 'react-color';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

const Color = (props) => {
  return (
    <div className="card">
      <div className="card-body bg-primary">
        asdölfk
      </div>
      <div className="card-body">
        <CirclePicker />
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <h3>Home Control</h3>
        <hr />
            <Color />
      </div>
    );
  }
}

export default App;
