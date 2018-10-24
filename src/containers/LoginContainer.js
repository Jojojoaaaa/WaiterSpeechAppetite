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
      modal_visible: false,
      has_error: false,
      error_message: "",
      ip_address: "",
      loading: true
    }
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  openModal = () => {
    this.setState({modal_visible:true});
  }

  closeModal = () => {
    this.setState({modal_visible:false});
  }
  setError = (message) => {
    btn.reset();
    this.setState({
      has_error: true,
      error_message: message});
  }
  handleError = () => {
    this.setState({
      has_error: false,
      error_message: "" })
  }
  handleIPAddressChange = (ip_address) => {
    this.setState({ip_address: ip_address});
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
  handleSetIPAddress = () => {
    const {ip_address} = this.state;
    this.props.onSetIpAddress(ip_address);
    this.setState({modal_visible:false});
  }
  render() {
    const {modal_visible, has_error, error_message} = this.state;

    const handleLogin = this.handleLogin;
    const handleChange = this.handleChange;
    const openModal = this.openModal;
    const closeModal = this.closeModal;
    const handleError = this.handleError;
    const handleIPAddressChange = this.handleIPAddressChange;
    const handleSetIPAddress = this.handleSetIPAddress;
    return (
      <LoginComponent
        handleLogin = {handleLogin}
        handleChange = {handleChange}
        modal_visible = {modal_visible}
        openModal = {openModal}
        closeModal = {closeModal}
        handleIPAddressChange = {handleIPAddressChange}
        handleSetIPAddress = {handleSetIPAddress}>
        <ErrorPromptComponent
          has_error = {has_error}
          error_message = {error_message}
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


