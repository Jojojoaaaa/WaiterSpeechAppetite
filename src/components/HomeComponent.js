import React from 'react';
import {
    View, 
    Text, 
    Image,
    TouchableNativeFeedback} from 'react-native';
import style from '../styles/HomeStyles';
import mic from '../assets/mic.png';
import add from '../assets/add.png';
import sub from '../assets/minus.png';

export default function HomeComponent(props) {
    const {
        speechHandler,
        viewOrders,
        logOutHandler,
        orders_ready} = props;
    return (
        <View style = {style.container}> 
            <Text>Big Text ni Sa</Text>
            <Text>Tap the button to create order</Text>
            <TouchableNativeFeedback
                onPress={() => speechHandler()}>
                <Image
                    style={style.image}
                    source={mic}/>
            </TouchableNativeFeedback>
            <Text>Orders Ready Badge: {orders_ready}</Text>
            <TouchableNativeFeedback
                onPress={() => viewOrders()}>
                <Image
                    style={style.bell}
                    source={add}/>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
                onPress={() => logOutHandler()}>
                <Image
                    style={style.bell}
                    source={sub}/>
            </TouchableNativeFeedback>
        </View>
    )
}
