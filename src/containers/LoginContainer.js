import React, {Component}from 'react';
import LoginComponent from '../components/LoginComponent';
import {Alert} from 'react-native';
import { withRouter } from 'react-router-native'
import {MAIN_URL, LOGIN} from '../constants/urls';

class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      waiter_id: "",
      password: "",
      valid: false,
    }
  }
  handleLogin = () => {
    const {waiter_id, password} = this.state;
    fetch(MAIN_URL + LOGIN, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          waiter_id: waiter_id
        })
      }).then((response)=> response.json())
              .then((responseJson)=>{
                this.validateWaiter(responseJson);
              }).catch((error) => {
                Alert.alert('There seems to be a problem! \n' +
                'Make sure you are connected to the server and that the server is running.');
              });

  }
  validateWaiter = (result_json) => {
    if (result_json.result>0){
      const {password} = this.state;
      if (password === result_json.password){
        this.props.history.push('/'+this.state.waiter_id);
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
        waiter_id = {this.state.waiter_id}
        password = {this.state.password}
        handleLogin = {this.handleLogin}
        handleChange = {this.handleChange}/>
    );
  }
}
export default withRouter(LoginContainer);


