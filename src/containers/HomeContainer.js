import React, {Component} from 'react';
import HomeComponent from '../components/HomeComponent';
import Voice from 'react-native-voice';
import {View} from 'react-native';

export default class HomeContainer extends Component {
    constructor(props) {
        super(props)
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        this.main_url = props.main_url;
    }
    speechHandler = () =>{
        Voice.start('en-US');
    }
    onSpeechStartHandler () {
        console.log('Listening');
    }
    onSpeechEndHandler () {
        console.log('Stopped Listening');
    }
    onSpeechResults (results) {
        console.log('Result');
    }
    render() {
        return (
            <HomeComponent
                speechHandler ={this.speechHandler}/>
        )
    }
}