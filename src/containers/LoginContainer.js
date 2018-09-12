import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'
import axios from '../axios';

import {Alert} from 'react-native';

import LoginComponent from '../components/LoginComponent';
import * as  actions from '../store/actions';
import * as url from '../constants/urls';
import * as routes from '../constants/routes';

class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      waiter_id: "",
      password: "",
    }
  }
  handleLogin = () => {
    const {waiter_id, password} = this.state;
    const post_data = {waiter_id: waiter_id};

    axios.post(url.LOGIN, post_data)
      .then(response => {
        this.validateWaiter(response.data)
      })
        .catch(error => {
          Alert.alert('There seems to be a problem! \n' +
          'Make sure you are connected to the server and that the server is running.');
        });
  }
  validateWaiter = (result_json) => {
    if (result_json.result>0){
      const {password, waiter_id} = this.state;
      if (password === result_json.password){
        this.props.onLogin(waiter_id);
        this.props.history.push('routes.HOME');
      }
      else {
        Alert.alert('Your password is incorrect!');
      }
    }
    else {
      Alert.alert('Waiter ID does not exist! Please try again!');
    }
  }
  handleChange = (name, value) => {
    this.setState({[name] : value});
  }
  render() {
    return (
      <LoginComponent
        handleLogin = {this.handleLogin}
        handleChange = {this.handleChange}/>
    );
  }
}

mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

mapDispatchToProps = dispatch => {
  return {
    onLogin: (waiter_id) => dispatch(actions.authorizeUser(waiter_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));


