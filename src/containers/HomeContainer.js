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
          reject("Speech recognizer is not available");
        }
        //sets up the processing of recognized words
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
        Alert.alert('Something went wrong...\n'+ this.findError(error));     
      });
    }
    //transfer to constants
    findError = (error_code) => {
      switch (error_code) {
        case 1:
          return 'Network operation timeout!'
        case 2:
          return 'Error on network!';
        case 3:
          return 'Error recording audio!';
        case 4: 
          return 'Server error!';
        case 5:
          return 'Client side error!';
        case 6: 
          return 'No speech input';
        case 7: 
          return 'No match found!';
        case 9:
          return 'Insufficient permissions!';
        default:
          return error_code;  
      }
    }

    verifySpeech = (speech_results) => {
      console.log(speech_results);
      if (speech_results.includes(commands.CREATE_ORDER)) 
        {
          this.props.history.push(routes.ORDER_ACTIVITY);
        }
      else {
        Alert.alert('Please try again...');
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