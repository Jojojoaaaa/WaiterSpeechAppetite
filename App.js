import React, {Component}from 'react';
import Login from './src/pages/Login';
import Home from './src/pages/Home'
import { NativeRouter, Route, Link, Redirect, Switch } from 'react-router-native'
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
            <Route exact path="/:waiterID" component ={Home}/>
          </Switch>
        </View>
      </NativeRouter>  
    );
  }
}