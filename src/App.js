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

class App extends Component {
  state = {
    color: '#fff',
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
      </div>
    );
  };
}

export default App;
