import React from 'react';
import {
        View, 
        Image, 
        Text, 
        Button,
        TouchableNativeFeedback,
        TouchableOpacity} from 'react-native';

export function OrderEntry(props) {
    const {
        order_name, 
        order_cat_icon, 
        order_price, 
        order_subtotal, 
        order_qty } = props;
    return (
        <View>
            <Text>{order_name}</Text>
            <Text>{order_price}</Text>
            <Text>{order_subtotal}</Text>
            <Text>{order_qty}</Text>
        </View>
    )
}

export function OrderActivityComponent(props) {
    const {
        table_num, 
        total,
        startSpeechListener,
        stopSpeechListener} = props;

    return (
        <View style = {{paddingTop: 100}}> 
            <Text>TABLE NUMBER: {table_num}</Text>
            <Text>TOTAL: Php {total}</Text>
            <Button
             title="Image ni, hehe"
             onPress={() => startSpeechListener()}/>
            {props.children}
        </View>
    )
}
//button add minus
//text orderdesc, qty, total, table number
//button mic 
//nav home, log out, pending orders