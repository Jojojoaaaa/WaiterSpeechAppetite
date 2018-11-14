import React from 'react';
import Swipeout from 'react-native-swipeout';

import CatImage from '../containers/CategoryImageContainer';

import * as method from '../constants/type';

import style from '../styles/OrderActivityStyles';

import home from '../assets/orderview/btnBack.png';
import add from '../assets/orderact/btnAdd.png';
import sub from '../assets/orderact/btnMinus.png';
import mic from '../assets/home/btnMic.png';
import header from '../assets/orderact/activityheader.png';
import footer from '../assets/orderact/footer.png';


import {
        View, 
        Image, 
        Text, 
        Button,
        ScrollView,
        TouchableOpacity} from 'react-native';

export function OrderEntry(props) {
    const {
        order_name, 
        order_category_id, 
        order_price, 
        order_subtotal, 
        order_qty,
        modifyOrderEntry,
        deleteOrderEntry } = props;
    var swipeoutBtns = [
        {

          text: 'Delete',
          backgroundColor: '#C04949',
          onPress: () => {deleteOrderEntry(order_name)}
        }
      ]
    return (
        <Swipeout 
            right={swipeoutBtns}
            style={{flex: 1, marginBottom: 5}}
            backgroundColor={'transparent'}
            autoClose={true}>
            <View style={style.orders_body}>
                <View style={style.box_one}>
                    <CatImage
                        category_id = {order_category_id}
                        style ={style.category_image}/>
                </View>
                <View style={style.box_two}>
                    <View style={style.two_menu}>
                        <Text style={{fontSize:18, fontWeight:'bold', color: '#4f4f4f'}}>{order_name}</Text>
                        <Text style={{fontSize:14, color: '#da8c75'}}>Php {order_price}</Text>
                    </View>
                    <View style={style.two_total}>
                        <Text style={{fontSize:14,color: '#4f4f4f'}}>Subtotal: Php {order_subtotal}</Text>
                    </View>
                </View>
                <View style={style.box_three}>
                    <View style={style.three_qty}>
                        <TouchableOpacity
                            onPress={() => modifyOrderEntry(method.ADD_QTY, order_name)}>
                        <Image
                        style={style.image_button}
                        source={add}/>
                        </TouchableOpacity>
                        <Text style={{fontSize:16}}>{order_qty}</Text>
                        <TouchableOpacity
                                onPress={() => modifyOrderEntry(method.SUB_QTY, order_name)}>
                            <Image
                            style={style.image_button}
                            source={sub}/>
                        </TouchableOpacity>
                    </View>
                </View>
               
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
            <View style ={style.body}>   
                <View style={style.box_start}>
                 <Image style={style.header}
                    source={header}></Image>
                    <View style={style.box_nav}>
                        <TouchableOpacity
                                onPress={() => goToHome()}>
                            <Image
                            style={style.home_button}
                            source={home}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Table No. {table_number}</Text> 
                    </View>
                   
                    <View style={style.box_total}>
                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>TOTAL: Php {total}</Text>
                    </View>    
                </View>
                <View style={style.box_mid}>
                <ScrollView style={style.orders_container}>
                {props.children}
                </ScrollView>
                </View>
                <View style={style.box_end}>
                 <Image style={style.header}
                    source={footer}></Image>
                    <TouchableOpacity
                        onPress={() => startSpeechListener()}>
                        <Image
                            style={style.mic_image_button}
                            source={mic}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}