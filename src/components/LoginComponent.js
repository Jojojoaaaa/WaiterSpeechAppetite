import React from 'react';
import {
    TextInput, 
    Text , 
    View,
    Image, 
    Button} from 'react-native';
import style from '../styles/LoginStyles';

import img from '../assets/img.jpg';
export default function LoginComponent(props) {
    const { handleLogin,
            handleChange,
            } = props;

    return (
        <View style = {style.container}>
            <Image
            style = {style.image} 
            source = {img} />
            <TextInput
                style={style.text_input}
                placeholder ="Waiter ID"        
                onChangeText ={(text) => handleChange('waiter_id', text)}
                />
            <TextInput
                style={style.text_input}
                placeholder ="Password"
                secureTextEntry ={true}
                onChangeText ={(text) => handleChange('password', text)}                
                />
                <Button 
                    style = {style.button}
                    onPress = {() => handleLogin()}
                    title="Login"  
                    color = 'red'/>
        </View>
    );
}
