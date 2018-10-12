import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'
import axios from '../axios';

import {Alert} from 'react-native';

import LoginComponent from '../components/LoginComponent';
import ErrorPromptComponent from '../components/ErrorPromptComponent';

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
      modalVisible: false,
      hasError: false,
      errorMessage: "",
    }
  }

  openModal = (btn) => {
    this.setState({modalVisible:true});
    btn.reset();
  }

  closeModal = () => {
    this.setState({modalVisible:false});
  }
  setError = (message) => {
    btn.reset();
    this.setState({
      hasError: true,
      errorMessage: message});
  }
  handleError = () => {
    this.setState({
      hasError: false,
      errorMessage: "" })
  }
  handleLogin = (btn) => {
    console.log('clicku');
    let {waiter_id} = this.state;
    waiter_id = waiter_id.trim();
    const post_data = {waiter_id:waiter_id};
    try {
      axios.post(this.props.main_url + url.LOGIN, post_data)
      .then(response => {
        console.log(response.data);
        this.validateWaiter(response.data,btn)
      })
      .catch(error => {
        if (error.response.status === 404 ) {
          this.setError(dialog.SERVER_ERROR);
        }
        console.log(error.response);
        btn.reset()
      })
    }
    catch (error){
      console.log(error);
    }
    
  }
  processLogin = (post_data) => {
    return (
      axios.post(this.props.main_url + url.LOGIN, post_data)
      .then(response => response.data)
      .catch(error => error.message)
    )
  }
  validateWaiter = (result_json,btn) => {
    btn.reset();
    if (result_json.result>0){
      const {password, waiter_id} = this.state;
      if (password === result_json.password){
        this.props.onLogin(waiter_id.trim());
        this.props.history.push(routes.HOME);
      }
      else {
        this.setError(dialog.INCORRECT_PASSWORD);
      }
    }
    else {
      this.setError(dialog.NO_WAITER_ID);
    }
  }
  handleChange = (name, value) => {
    this.setState({[name] : value});
  }

  render() {
    const {modalVisible, hasError, errorMessage} = this.state;

    const handleLogin = this.handleLogin;
    const handleChange = this.handleChange;
    const openModal = this.openModal;
    const closeModal = this.closeModal;
    const handleError = this.handleError;
    return (
      <LoginComponent
        handleLogin = {handleLogin}
        handleChange = {handleChange}
        modalVisible = {modalVisible}
        openModal = {openModal}
        closeModal = {closeModal}>
        <ErrorPromptComponent
          hasError = {hasError}
          errorMessage = {errorMessage}
          handleError = {handleError} />
      </LoginComponent>
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
    onLogin: (waiter_id) => dispatch(actions.authorizeUser(waiter_id)),
    onSetIpAddress: (ip_address) => dispatch(actions.setIpAddress(ip_address))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));


