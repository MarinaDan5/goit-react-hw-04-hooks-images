import React, { Component } from 'react';

import Loader from 'react-loader-spinner';

import './Loader.css';


export default class App extends Component {

  render() {
    return (
      <div className="loader-wrapper">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
          visible={true}
        />
      </div>
    );
  }
}
