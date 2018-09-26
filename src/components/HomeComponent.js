import React from 'react';
import {
    View, 
    Text, 
    Image,
    TouchableNativeFeedback} from 'react-native';
import style from '../styles/HomeStyles';
import mic from '../assets/mic.png';

export default function HomeComponent(props) {
    const {speechHandler} = props;
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
        </View>
    )
}
