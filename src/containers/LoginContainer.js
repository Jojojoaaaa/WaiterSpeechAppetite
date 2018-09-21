import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'
import axios from '../axios';

import {Alert} from 'react-native';

import LoginComponent from '../components/LoginComponent';
import * as  actions from '../store/actions';
import * as url from '../constants/urls';
import * as routes from '../constants/routes';
import * as dialog from '../constants/user_dialogs';

class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      waiter_id: "",
      password: "",
    }
  }

  handleLogin = () => {
    let {waiter_id} = this.state;
    waiter_id = waiter_id.trim();
    const post_data = {waiter_id:waiter_id};

    axios.post(url.LOGIN, post_data)
      .then(response => {
        this.validateWaiter(response.data)
      })
      .catch(error => {
        //CATCH THIS MOFO ERROR
          console.log(error.response);
          Alert.alert(dialog.SERVER_ERROR);
        });
  }

  validateWaiter = (result_json) => {
    if (result_json.result>0){
      const {password, waiter_id} = this.state;
      if (password === result_json.password){
        this.props.onLogin(waiter_id);
        this.props.history.push(routes.HOME);
      }
      else {
        Alert.alert(dialog.INCORRECT_PASSWORD);
      }
    }
    else {
      Alert.alert(dialog.NO_WAITER_ID);
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


