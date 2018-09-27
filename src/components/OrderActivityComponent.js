import React from 'react';
import Swipeout from 'react-native-swipeout';

import * as method from '../constants/type';

import style from '../styles/OrderActivityStyles';

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
                    style={style.category_image}
                    source={cat}/>
                <Text>{order_name}</Text>
                <Text>{order_price} Php</Text>
                <Text>{order_subtotal} Php</Text>
                <TouchableNativeFeedback
                        onPress={() => modifyOrderEntry(method.ADD_QTY, order_name)}>
                    <Image
                    style={style.image_button}
                    source={add}/>
                </TouchableNativeFeedback>
                <Text>{order_qty}</Text>
                <TouchableNativeFeedback
                        onPress={() => modifyOrderEntry(method.SUB_QTY, order_name)}>
                    <Image
                    style={style.image_button}
                    source={sub}/>
                </TouchableNativeFeedback>
            </View>
        </Swipeout>
    )
}

export default function OrderActivityComponent(props) {
    const {
        table_number, 
        total,
        startSpeechListener,
        goToHome} = props;

    return (
        <View style ={style.container}>
            {/* will be header later; */}
            <View style={{height: '20%', backgroundColor: 'orange'}}/>
            <TouchableNativeFeedback
                    onPress={() => goToHome()}>
                <Image
                style={style.image_button}
                source={add}/>
            </TouchableNativeFeedback>
            <Text>TABLE NUMBER: {table_number}</Text>
            <Text>TOTAL: Php {total}</Text>

            <ScrollView style={style.orders_container}>
             {props.children}
            </ScrollView>
            <TouchableNativeFeedback
                onPress={() => startSpeechListener()}>
                <Image
                    style={style.mic_image_button}
                    source={mic}/>
            </TouchableNativeFeedback>
        </View>
    )
}