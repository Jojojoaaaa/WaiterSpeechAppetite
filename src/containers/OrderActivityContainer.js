import React, {Component}from 'react';
import {
    SpeechRecognizer,
    RecognizerIntent,
    RecognitionListener
  } from 'react-native-android-speech-recognizer';

import { withRouter } from 'react-router-native'
import {View, Alert, Text} from 'react-native';

import {OrderActivityComponent} from '../components/OrderActivityComponent';
import * as  dialog from '../constants/user_dialogs';
import * as  commands from '../constants/speech_commands';

class OrderActivityContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          speech_listener: '',
          listening: false
        }
      }
    componentWillMount() {
        this.initializeSpeechRecognizer();
    }
    initializeSpeechRecognizer = () => {
        SpeechRecognizer.createSpeechRecognizer()
            .then( speech_listener => {
                speech_listener.setRecognitionListener({
                    onError: event => {
                        console.log(event.error);
                        Alert.alert(dialog.SR_FAILED + this.findError(event.error));
                    },
                    onResults: event => {
                        var speech_results = event.results[SpeechRecognizer.RESULTS_RECOGNITION];
                        console.log(speech_results);
                        this.processSpeechResults(speech_results);
                    }
                });
                this.setState({speech_listener: speech_listener});
            });
    }
    processSpeechResults = (speech_results) => {
      const _break = true;
      speech_results.some(speech => {
        if (commands.ADD_ENTRY.test(speech)) {
          console.log(speech);
          const order_matches = speech_results.filter(match => commands.ADD_ENTRY.test(match));
          const last_index = order_matches.length -1;
          
					order_matches.some((match, i) => {
						match = match.split(' ');
						const qty = match[1];
            const order = match.splice(2).join(' ');
            console.log("Order: " + order + " Qty: " + qty);
            return _break;
            //db check
					});
          return _break;
        }
      })
    }
    startSpeechListener = () => {
        const {speech_listener} = this.state;
        speech_listener.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});
        // this.setState({
        //   listening: true
        // })
    }
    // stopSpeechListener = () => {
    //   // const {speech_listener} = this.state;
    //   // speech_listener.stopListening();
    //     this.setState({
    //       listening: false
    //     })
    //}
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
    render () {
        //get state
        const startSpeechListener = this.startSpeechListener;
        const stopSpeechListener = this.stopSpeechListener;

        return (
            <OrderActivityComponent
                startSpeechListener = {startSpeechListener}
                stopSpeechListener = {stopSpeechListener}/>
        )
    }
}

export default withRouter(OrderActivityContainer);