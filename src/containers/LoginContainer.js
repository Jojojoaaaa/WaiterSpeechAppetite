import React, {Component}from 'react';
import LoginComponent from '../components/LoginComponent';
import {Alert} from 'react-native';

export default class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      waiter_id: "",
      password: "",
      valid: false,
    }
    this.main_url = props.main_url;
    this.validateLogin = props.validateLogin;
  }
  handleLogin = () => {
    const {waiter_id, password} = this.state;

    fetch(this.main_url+'login.php', 
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
                //var  alert_text = responseJson.result + " " + responseJson.password;
                //Alert.alert(alert_text)
                this.validateWaiter(responseJson);
              }).catch((error) => {
                Alert.alert(error);
              });

  }
  validateWaiter = (result_json) => {
    if (result_json.result>0){
      const {password} = this.state;
      if (password === result_json.password){
        this.validateLogin();
      }
      else {
        Alert.alert('Your password is incorrect!');
      }
    }
    else {
      Alert.alert('Waiter ID does not exist');
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


