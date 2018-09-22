import React, {Component}from 'react';
import {
    SpeechRecognizer,
    RecognizerIntent,
    RecognitionListener
  } from 'react-native-android-speech-recognizer';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-native'
import axios from '../axios';

import {View, Alert, Text} from 'react-native';

import {OrderActivityComponent , OrderEntry} from '../components/OrderActivityComponent';
import * as  dialog from '../constants/user_dialogs';
import * as  commands from '../constants/speech_commands';
import * as url from '../constants/urls';
import * as method from '../constants/method';

class OrderActivityContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          speech_listener: '',
          table_number: '',
          orders: [],
          total: 0,
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

      const command_recognized = speech_results.some(speech => {
        if (commands.SET_TABLE_NUMBER.test(speech)){
          this.setTableNumber(speech);
          return _break;
        }
        else if (commands.CONFIRM_ORDER.test(speech)){
          this.confirmOrder();
          return _break; 
        }
        else if (commands.ADD_ENTRY.test(speech)) {
          this.processOrderEntry(speech_results);
          return _break;
        }
      })

      if (!command_recognized) {
        Alert.alert(dialog.SPEECH_COMMAND_404);
      }
    }
    processOrderEntry = (speech_results) => {
      const _break = true;
      const { menu } = this.state;
      console.log(menu);

      const order_matches = speech_results.filter(match => commands.ADD_ENTRY.test(match));
      const last_index = order_matches.length -1;

      order_matches.some((match, i) => {
        let orders = [...this.state.orders];
        let order_exists = false;
        console.log(match);

        match = match.split(' ');        
        const qty = parseInt(match[1], 10);
        const order = match.splice(2).join(' ');

        const order_in_menu = menu.includes(order.toUpperCase());

        if (orders.length > 0 ){
          order_exists = order_exists = orders.some(o => o.order_name === order);
        }
        if (!order_exists) {
          if (order_in_menu) {
            this.retrieveOrderDetail(order).then(res => {
              if (qty <= res.servings){
                const order_detail = {
                  order_name: order,
                  order_price: res.price,
                  order_subtotal: res.price * qty,
                  order_qty: qty
                }
                console.log(orders);
                orders.push(order_detail);
                this.setState({orders: orders});
                this.setTotal();
              }
              else {
                Alert.alert(dialog.NOT_ENOUGH_SERVINGS);
              }
            })
            return _break;
          }
          else {
            if (last_index === i) {
              Alert.alert(dialog.ORDER_DOES_NOT_EXIST);
            }
          }
        }
        else {
          Alert.alert(dialog.ORDER_DUPLICATE);
          return _break;
        }
      });
    }
    setTableNumber = (speech) => {
      speech = speech.split(' ');
      const table_number = parseInt(speech[2], 10);
      this.setState({table_number: table_number});
    }
    setTotal = () => {
      const {orders} = this.state;
      let total = 0;
      orders.forEach(order => {
        total += order.order_subtotal;
      })
      this.setState({total: total});
    }
    confirmOrder = () => {
      const {table_number, orders} = this.state;
      if (table_number === '') {
        Alert.alert(dialog.NO_TABLE_NUMBER);
      }
      else if (orders.length === 0) {
        Alert.alert(dialog.NO_ORDER_ENTRY)
      }
      else {
        Alert.alert('ORDER CONFIRMED');
        //CODES HERE;
      }
    }
    modifyOrderEntry = (method_name, order) => {
      let orders = [...this.state.orders];
      let order_idx = orders.findIndex(o => order === o.order_name );
      let order_entry = orders[order_idx];
      let qty = order_entry.order_qty;

  
      if (method_name === method.ADD_QTY) {
        qty += 1;
      }
      else if (qty > 1 && method_name === method.SUB_QTY) {
        qty -= 1;
      }
      order_entry.order_qty = qty;
      order_entry.order_subtotal = qty * order_entry.order_price;
      orders[order_idx] = order_entry;
      this.setState({orders: orders});
      this.setTotal();
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
        orders,
        table_number,
        total
      } = this.state;

      const startSpeechListener = this.startSpeechListener;
      const stopSpeechListener = this.stopSpeechListener;
      const modifyOrderEntry = this.modifyOrderEntry;

      let order_list_display = (
        orders.map(order => {
          return (
            <OrderEntry
            key = {order.order_name + order.order_qty}
            order_name = {order.order_name}
            order_price = {order.order_price}
            order_subtotal = {order.order_subtotal}
            order_qty = {order.order_qty}
            modifyOrderEntry = {modifyOrderEntry}
            />
          );
        })
      )
      return (
        <View>
          <OrderActivityComponent
            table_number = {table_number}
            total = {total}
            startSpeechListener = {startSpeechListener}
            stopSpeechListener = {stopSpeechListener}>
            {order_list_display}
          </OrderActivityComponent>
        </View>    
      )
    }
}
mapStateToProps = state => {
  return {
    auth: state.auth,
    waiter_id: state.waiter_id
  };
};

export default connect(mapStateToProps)(withRouter(OrderActivityContainer));