import React, {Component} from 'react';
import {
    SpeechRecognizer,
    RecognizerIntent,
    RecognitionListener
  } from 'react-native-android-speech-recognizer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'
import axios from '../axios';

import {View, Alert, Text} from 'react-native';

import HomeComponent from '../components/HomeComponent';
import * as  commands from '../constants/speech_commands';
import * as  routes from '../constants/routes';
import * as  url from '../constants/urls';
import * as  dialog from '../constants/user_dialogs';
import * as type from '../constants/type';
import * as  actions from '../store/actions';


class HomeContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      speech_listener: ''
    }
  }

  componentWillMount () {
    if (!this.props.auth) {
      this.props.history.push(routes.LOGIN);
    }
    else {
     this.initializeSpeechRecognizer();
     this.getAllOrdersRecord();
    }
  }
  componentDidMount() {
   console.log(this.props);
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
      Alert.alert(
        'Type of Order',
        'Choose type of order',
        [
          {text: 'Dine In', onPress: () => this.startCreatingOrders(type.DINE_IN)},
          {text: 'Take Out', onPress: () => this.startCreatingOrders(type.TAKE_OUT)},
        ],
        { cancelable: true }
      )
    }
    else {
      Alert.alert(dialog.SPEECH_COMMAND_404);
    }
  }
  startCreatingOrders = (order_type) => {
    this.props.history.push({pathname: routes.ORDER_ACTIVITY, order_type: order_type});
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
  getAllOrdersRecord = () => {
    const post_data = {waiter_id: this.props.waiter_id}
      axios.post(url.RETRIEVE_ORDERS, post_data)
        .then(response => {
            const orders_record = response.data;
            let orders_ready_count = 0;
            orders_record.forEach(o => {
              orders_ready_count += type.READY_CHECK.test(o.status) ? 1 : 0;
            });
            this.props.onSetOrders(orders_record, orders_ready_count);
        })
    setTimeout(this.getAllOrdersRecord, 2000);
  }


  speechHandler = () => {
    const {speech_listener} = this.state;
    speech_listener.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});
  }
  viewOrders = () => {
    this.props.history.push(routes.ORDERS_VIEW);
  }

  logOutHandler = () => {
    this.props.onLogout();
    this.props.history.push(routes.LOGIN);
  }
  render() {
    const speechHandler = this.speechHandler;
    const viewOrders = this.viewOrders;
    const logOutHandler = this.logOutHandler;
    const orders_ready_count = this.props.orders_ready_count;
      return (
          <HomeComponent
              speechHandler={speechHandler}
              viewOrders={viewOrders}
              logOutHandler={logOutHandler}
              orders_ready_count={orders_ready_count} />
      )
  }
}

mapStateToProps = state => {
  return {
    auth: state.auth,
    waiter_id: state.waiter_id,
    orders_ready_count: state.orders_ready_count,
    orders_record: state.orders_record
  };
};
mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.unauthorizeUser()),
    onSetOrders: (orders_record, orders_ready_count) => dispatch(actions.setOrdersRecord(orders_record, orders_ready_count))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));