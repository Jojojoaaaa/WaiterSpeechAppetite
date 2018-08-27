import React from 'react';
import {View, Text, Button} from 'react-native';

export default function HomeComponent(props) {
    const {speechHandler} = props;
    return (
        <View style = {{paddingTop: 100}}> 
            <Text>Tap the button to create order</Text>
            <Button
                title="Start"
                onPress={speechHandler}/>
        </View>
    )
}
