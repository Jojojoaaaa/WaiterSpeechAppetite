import React from 'react';
import Swipeout from 'react-native-swipeout';

import * as method from '../constants/method';
import add from '../assets/add.png';
import sub from '../assets/minus.png';
import cat from '../assets/cat.png';
import mic from '../assets/mic.png';

import {
        View, 
        Image, 
        Text, 
        Button,
        ScrollView,
        TouchableNativeFeedback} from 'react-native';

export function OrderEntry(props) {
    const {
        order_name, 
        order_category, 
        order_price, 
        order_subtotal, 
        order_qty,
        modifyOrderEntry,
        deleteOrderEntry } = props;
    //conditional render on image
    //const image source={require('/react-native/img/favicon.png')}
    var swipeoutBtns = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => {deleteOrderEntry(order_name)}
        }
      ]
    return (
        <Swipeout 
            right={swipeoutBtns} 
            backgroundColor={'transparent'}
            autoClose={true}>
            <View>
                <Image
                    style={{width: 50, height: 50}}
                    source={cat}/>
                <Text>{order_name}</Text>
                <Text>{order_price} Php</Text>
                <Text>{order_subtotal} Php</Text>
                <TouchableNativeFeedback
                        onPress={() => modifyOrderEntry(method.ADD_QTY, order_name)}>
                    <Image
                    style={{width: 20, height: 20}}
                    source={add}/>
                </TouchableNativeFeedback>
                <Text>{order_qty}</Text>
                <TouchableNativeFeedback
                        onPress={() => modifyOrderEntry(method.SUB_QTY, order_name)}>
                    <Image
                    style={{width: 20, height: 20}}
                    source={sub}/>
                </TouchableNativeFeedback>
            </View>
        </Swipeout>
    )
}

export function OrderActivityComponent(props) {
    const {
        table_number, 
        total,
        startSpeechListener,
        stopSpeechListener} = props;

    return (
        <View style ={{backgroundColor: '#d3d3d3'}}>
            <View style={{height: '20%', backgroundColor: 'orange'}}></View>

            <Text>TABLE NUMBER: {table_number}</Text>
            <Text>TOTAL: Php {total}</Text>

            <ScrollView style={{height:'60%', backgroundColor: 'white'}}>
             {props.children}
            </ScrollView>
            <TouchableNativeFeedback
                onPress={() => startSpeechListener()}>
                <Image
                    style={{height: 80, width: 80}}
                    source={mic}/>
            </TouchableNativeFeedback>
        </View>
    )
}
//button add minus
//text orderdesc, qty, total, table number
//button mic 
//nav home, log out, pending orders