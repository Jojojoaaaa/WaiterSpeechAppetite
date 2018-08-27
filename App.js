import React, {Component}from 'react';
import Login from './src/pages/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {main_url: 'http://192.168.254.109/android_queries/'};
    //192.168.43.193 if hotspot
  }
  render() {
    return (
      <Login main_url ={this.state.main_url}/>
    );
  }
}