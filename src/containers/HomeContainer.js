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

    componentWillMount () {
      console.log(this.props);
      if (!this.props.auth) {
        this.props.history.push(routes.LOGIN);
      }
    }

    initializeSpeechRecognizer = () => {
      const speech_recognizer = options => new Promise(async (resolve, reject) => {
        //check if available
        const available = await SpeechRecognizer.isRecognitionAvailable();
        if (!available) {
          reject(dialog.SR_UNAVAILABLE);
        }
        //sets up the processes of recognizer
        const speech_listener = await SpeechRecognizer.createSpeechRecognizer();
        speech_listener.setRecognitionListener({
          onError: event => reject(event.error),
          onResults: event => {
            var speech_results = event.results[SpeechRecognizer.RESULTS_RECOGNITION];
            speech_results = speech_results.map(speech => speech.toUpperCase());
            resolve(speech_results);
          }
        });

        speech_listener.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});          
      });
      //defines what to do with results
      speech_recognizer().then(speech_results => {
        this.verifySpeech(speech_results);
      }).catch(error => {
        console.log(error);
        Alert.alert(dialog.SR_FAILED + this.findError(error));     
      });
    }

    verifySpeech = (speech_results) => {
      console.log(speech_results);
      if (speech_results.includes(commands.CREATE_ORDER)) 
        {
          this.props.history.push(routes.ORDER_ACTIVITY);
        }
      else {
        Alert.alert(dialog.SPEECH_COMMAND_404);
      }
    }

    //transfer to constants
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
      this.initializeSpeechRecognizer();             
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