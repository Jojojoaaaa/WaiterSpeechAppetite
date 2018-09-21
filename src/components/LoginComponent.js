import React from 'react';
import {TextInput, Text , View, Button} from 'react-native';

export default function LoginComponent(props) {
    const { handleLogin,
            handleChange,
            } = props;

    return (
        <View style = {{paddingTop: 100}}>
            <TextInput
                style={{height: 40, borderColor: 'orange', borderWidth:1}}
                placeholder ="Waiter ID"        
                onChangeText ={(text) => handleChange('waiter_id', text)}
                />
            <TextInput
                style={{height: 40, borderColor: 'orange', borderWidth:1}}
                placeholder ="Password"
                secureTextEntry ={true}
                onChangeText ={(text) => handleChange('password', text)}                
                />
                <Button 
                    onPress = {() => handleLogin()}
                    title="Login"  
                    color = 'red'/>
        </View>
    );
}
