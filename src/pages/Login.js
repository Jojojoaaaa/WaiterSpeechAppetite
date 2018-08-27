import React, {Component}from 'react';
import LoginContainer from '../containers/LoginContainer';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.main_url = props.main_url;
    }
  render() {
    return (
        <LoginContainer main_url = {this.main_url}/>
    );
  }
}


