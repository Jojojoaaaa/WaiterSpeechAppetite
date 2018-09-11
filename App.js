import React, {Component}from 'react';
import { createStore } from 'redux';

import { NativeRouter, Route, Redirect, Switch } from 'react-router-native';
import { Provider } from 'react-redux';

import Login from './src/pages/Login';
import Home from './src/pages/Home'
import { Alert, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <NativeRouter>
        <View>
          <Switch>
            <Route exact path="/" render={()=> <Redirect to="/login"/>}/>
            <Route exact path="/login" component = {Login}/>
            <Route exact path="/home" component ={Home}/>
          </Switch>
        </View>
      </NativeRouter>  
    );
  }
}