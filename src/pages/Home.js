import React, {Component}from 'react';
import HomeContainer from '../containers/HomeContainer';
import {
    SpeechRecognizer,
    RecognizerIntent,
    RecognitionListener
  } from 'react-native-android-speech-recognizer';

export default class Home extends Component {
    constructor (props){
        super(props)
        this.main_url = props.main_url;
    }
    render() {
        return (
            <HomeContainer main_url = {this.main_url}/>
        )
    }
}