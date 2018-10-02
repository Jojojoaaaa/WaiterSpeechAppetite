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
      modalVisible: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  handleLogin = (btn) => {
    let {waiter_id} = this.state;
    waiter_id = waiter_id.trim();
    const post_data = {waiter_id:waiter_id};
    this.processLogin(post_data)
      .then(res => {
        console.log(res);
        this.validateWaiter(res,btn)
      })
      .catch(err => {
        console.log(err);
        Alert.alert(dialog.SERVER_ERROR);
        
      })
    
  }
  processLogin = (post_data) => {
    return (
      axios.post(this.props.main_url + url.LOGIN, post_data)
      .then(response => response.data)
      .catch(error => error.response)
    )
  }
  validateWaiter = (result_json,btn) => {
    if (result_json.result>0){
      const {password, waiter_id} = this.state;
      if (password === result_json.password){
        this.props.onLogin(waiter_id.trim());
        this.props.history.push(routes.HOME);
      }
      else {
        Alert.alert(dialog.INCORRECT_PASSWORD);
        btn.reset();
      
      }
    }
    else {
      Alert.alert(dialog.NO_WAITER_ID);
      btn.reset();
    }
  }
  handleChange = (name, value) => {
    this.setState({[name] : value});
  }

  render() {
    return (
      <LoginComponent
        handleLogin = {this.handleLogin}
        handleChange = {this.handleChange}
        setModalVisible = {this.setModalVisible}
        modalVisible = {this.state.modalVisible}
        visibleModal = {this.state.visibleModal}
        />
    );
  }
}

mapStateToProps = state => {
  return {
    auth: state.auth,
    main_url: state.main_url
  };
};

mapDispatchToProps = dispatch => {
  return {
    onLogin: (waiter_id) => dispatch(actions.authorizeUser(waiter_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));


