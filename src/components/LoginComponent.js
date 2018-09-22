import React from 'react';
import {
    TextInput, 
    Text , 
    View,
    Image, 
    Button} from 'react-native';

export default function LoginComponent(props) {
    const { handleLogin,
            handleChange,
            } = props;

    return (
        <View style = {{
            paddingTop: 50,
            justifyContent: 'center',
            alignItems: 'center',}}>
            <Image
            style = {{width: 200, height: 200, marginBottom: 100,  borderRadius: 150 }} 
            source = {require('../assets/img.jpg')} />
            <TextInput
                style={{width: 200, height: 40, marginBottom: 15, borderColor: 'orange', borderWidth:1}}
                placeholder ="Waiter ID"        
                onChangeText ={(text) => handleChange('waiter_id', text)}
                />
            <TextInput
                style={{width: 200, height: 40, marginBottom: 15, borderColor: 'orange', borderWidth:1}}
                placeholder ="Password"
                secureTextEntry ={true}
                onChangeText ={(text) => handleChange('password', text)}                
                />
                <Button 
                    style = {{width: 150, borderRadius: 15}}
                    onPress = {() => handleLogin()}
                    title="Login"  
                    color = 'red'/>
        </View>
    );
}
