import React from 'react';
import {
    View, 
    Text, 
    Image,
    TouchableNativeFeedback,
    TouchableOpacity,
    } from 'react-native';
import style from '../styles/HomeStyles';
import exit from '../assets/home/exit.png';
import order from '../assets/home/btnOrders.png';
import mic from '../assets/home/btnMic.png';
import bg from '../assets/home/homebg.png';

import IconBadge from 'react-native-icon-badge';

export default function HomeComponent(props) {
    const {
        speechHandler,
        viewOrders,
        logOutHandler,
        orders_ready_count
        } = props;
    return (
        <View style = {style.container}>
            <View style = {style.body}>
                <Image
                    style={style.bg}
                    source={bg}>
                </Image>

                <View style={style.boxOne}>
                    <TouchableOpacity
                        onPress={() => logOutHandler()}>
                        <Image
                            source={exit}>
                        </Image>
                    </TouchableOpacity>

                    <IconBadge
                        MainElement={
                            <TouchableOpacity
                                onPress={() => viewOrders()}>
                                <Image
                                    style={{marginRight:10, marginTop:6}}
                                    source={order}>
                                </Image>
                            </TouchableOpacity>
                        }
                        BadgeElement={
                        <Text style={{color:'#FFFFFF', fontSize: 12}}>
                        {orders_ready_count}
                        </Text>
                        }
                        IconBadgeStyle={
                        {width:15,
                        height:20,
                        
                        backgroundColor: '#CE593F'}
                        }
                        Hidden={orders_ready_count==0}
                        />
                    </View>

                <View style={style.filler}></View>

                <View style = {style.boxTwo}>
                    <Text style={style.textHeading}>Create Order</Text>
                    <Text>Tap the button to create order</Text>
                    <TouchableNativeFeedback
                        onPress={() => speechHandler()}>
                        <Image
                            style={style.image}
                            source={mic}/>
                    </TouchableNativeFeedback>   
                </View> 
                {props.children}
            </View>
        </View>
    )
}
