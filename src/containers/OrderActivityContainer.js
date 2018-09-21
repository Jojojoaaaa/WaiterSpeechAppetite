import React, {Component}from 'react';
import {
    SpeechRecognizer,
    RecognizerIntent,
    RecognitionListener
  } from 'react-native-android-speech-recognizer';

import { withRouter } from 'react-router-native'
import axios from '../axios';

import {View, Alert, Text} from 'react-native';

import {OrderActivityComponent , OrderEntry} from '../components/OrderActivityComponent';
import * as  dialog from '../constants/user_dialogs';
import * as  commands from '../constants/speech_commands';
import * as url from '../constants/urls';

class OrderActivityContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          speech_listener: '',
          orders: [],
          menu: [],
        }
      }
    componentWillMount() {
        this.initializeSpeechRecognizer();
        this.getAllMenu();
    }
    componentDidMount() {
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
          this.processOrderEntry(speech_results);
          return _break;
        }
      })
    }
    processOrderEntry = (speech_results) => {
      const _break = true;
      const { menu } = this.state;
      console.log(menu);

      const order_matches = speech_results.filter(match => commands.ADD_ENTRY.test(match));
      const last_index = order_matches.length -1;

      order_matches.some((match, i) => {
        console.log(match);
        match = match.split(' ');
        
        const qty = parseInt(match[1], 10);
        const order = match.splice(2).join(' ');

        if (menu.includes(order.toUpperCase())) {
          this.retrieveOrderDetail(order).then(res => {
            if (qty <= res.servings){
              const order_detail = {
                order_name: order,
                order_price: res.price,
                order_subtotal: res.price * qty,
                order_qty: qty
              }
              let orders = [...this.state.orders];
              orders.push(order_detail);
              this.setState({orders: orders});
              console.log('order is processed');
            }
            else {
              console.log('not enough');
            }
          })
           return _break;
        }
        else {
          if (last_index === i) {
            console.log("menu does not exist");
          }
        }
      });
    }
    retrieveOrderDetail = (order) => {
      order = order.toUpperCase();
      const post_data = {order_name: order};
      return (
         axios.post(url.RETRIEVE_ORDER_DETAIL, post_data)
          .then(response => {
            return response.data;
          })
        );
    }

    getAllMenu = () => {
        axios.get(url.GET_ALL_MENU)
        .then(response => {
          const menu = response.data.map(m => m.Name);
          this.setState({menu: menu});
        });
    }

    startSpeechListener = () => {
      const {speech_listener} = this.state;
      speech_listener.startListening(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, {});
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
    render () {
      const {
        orders
      } = this.state;

      const startSpeechListener = this.startSpeechListener;
      const stopSpeechListener = this.stopSpeechListener;
      let order_list_display = (
        orders.map(order => {
          return (
            <OrderEntry
            order_name = {order.order_name}
            order_price = {order.order_price}
            order_subtotal = {order.order_subtotal}
            order_qty = {order.order_qty}
            />
          );
        })
      )
      return (
        <View>
          <OrderActivityComponent
            startSpeechListener = {startSpeechListener}
            stopSpeechListener = {stopSpeechListener}>
            {order_list_display}
          </OrderActivityComponent>
        </View>    
      )
    }
}

export default withRouter(OrderActivityContainer);