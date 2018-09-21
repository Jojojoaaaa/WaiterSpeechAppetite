import React, {Component} from 'react';
import {
    SpeechRecognizer,
    RecognizerIntent,
    RecognitionListener
  } from 'react-native-android-speech-recognizer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'

import {View, Alert, Text} from 'react-native';

import HomeComponent from '../components/HomeComponent';
import * as  commands from '../constants/speech_commands';
import * as  routes from '../constants/routes';
import * as  dialog from '../constants/user_dialogs';


class HomeContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      speech_listener: ''
    }
  }

  componentWillMount () {
    console.log(this.props);
    if (!this.props.auth) {
      this.props.history.push(routes.LOGIN);
    }
    else {
     this.initializeSpeechRecognizer();
    }
  }
  initializeSpeechRecognizer = () => {
    SpeechRecognizer.createSpeechRecognizer()
        .then( speech_listener => {
            speech_listener.setRecognitionListener({
                onError: event => {
                    Alert.alert(dialog.SR_FAILED + this.findError(event.error));
                },
                onResults: event => {
                    var speech_results = event.results[SpeechRecognizer.RESULTS_RECOGNITION];
                    this.verifySpeech(speech_results);
                  }
            });
            this.setState({speech_listener: speech_listener});
        });
  }
  verifySpeech = (speech_results) => {
    console.log(speech_results);
    const success = speech_results.some(speech => {
      const _break = true;
      if (commands.CREATE_ORDER.test(speech)) {
        return _break;
      }
    });
    if (success) {
      this.props.history.push(routes.ORDER_ACTIVITY);
    }
    else {
      Alert.alert(dialog.SPEECH_COMMAND_404);
    }
  }

  findError = (error_code) => {
    switch (error_code) {
      case 1:
        return dialog.NETWORK_TIME_OUT;
      case 2:
        return dialog.NETWORK_ERROR;
      case 3:
        return dialog.RECORD_AUDIO_ERROR
      case 4: 
        return dialog.SR_SERVER_ERROR;
      case 5:
        return dialog.CLIENT_ERROR;
      case 6: 
        return dialog.NO_SPEECH_INPUT;
      case 7: 
        return dialog.NO_MATCH_FOUND;
      case 8: 
        return dialog.SR_BUSY;          
      case 9:
        return dialog.INSUFFICIENT_PERMISSIONS;
      default:
        return error_code;  
    }
  }
   
  speechHandler = () => {
    const {speech_listener} = this.state;
    speech_listener.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});
  }
  render() {
      return (
          <HomeComponent
              speechHandler ={this.speechHandler}/>
      )
  }
}

mapStateToProps = state => {
  return {
    auth: state.auth,
    waiter_id: state.waiter_id
  };
};


export default connect(mapStateToProps)(withRouter(HomeContainer));