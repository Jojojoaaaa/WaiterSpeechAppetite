import React from 'react';
import {
    View, 
    Text, 
    Image,
    TouchableNativeFeedback} from 'react-native';

import mic from '../assets/mic.png';

export default function HomeComponent(props) {
    const {speechHandler} = props;
    return (
        <View style = {{paddingTop: 100}}> 
            <Text>Big Text ni Sa</Text>
            <Text>Tap the button to create order</Text>
            <TouchableNativeFeedback
                onPress={() => speechHandler()}>
                <Image
                    style={{height: 80, width: 80}}
                    source={mic}/>
            </TouchableNativeFeedback>
        </View>
    )
}
