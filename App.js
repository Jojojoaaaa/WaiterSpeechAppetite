import React, {Component}from 'react';
import Login from './src/pages/Login';
import Home from './src/pages/Home'
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import { Alert, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_url: 'http://192.168.254.117/android_queries/',
      isLoggedIn: false};
    //192.168.43.193 if hotspot
  }
  componentWillUnmount() {
    this.setState({
      isLoggedIn: false
    });
  }
  validateLogin = () => {
    this.setState({isLoggedIn: true})
  }
  render() {
    const{isLoggedIn, main_url} = this.state;

    return (
      <NativeRouter>
        <View>
          <Route exact path="/" 
            render ={(props) => (isLoggedIn ? 
                                  (<Home {...props}
                                    main_url = {main_url}/>)
                                  :                                   
                                    (<Redirect to="/login"/>) 
                                )}
          />
          <Route path="/login" 
             render={(props) => <Login {...props} 
                                  main_url={main_url} 
                                  validateLogin = {this.validateLogin} />}
          />
        </View>
      </NativeRouter>  
    );
  }
}