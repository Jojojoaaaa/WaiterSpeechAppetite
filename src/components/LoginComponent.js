import React from 'react';
import {
    TextInput,
    Text , 
    View,
    Image,
    TouchableOpacity
    } from 'react-native';
import style from '../styles/LoginStyles';
import img from '../assets/SAI.png';
import Btn from 'react-native-micro-animated-button';
import {Fumi }  from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";


export default function LoginComponent(props) {
    const { handleLogin,
            handleChange
            } = props;
    
    return (
        <View style = {style.container}>
            <Image
            style = {style.image} 
            source = {img} />

             <Fumi
                style={style.text_input}
                label={'Waiter ID'}
                iconClass={MaterialIcons}
                iconName={'account-circle'}
                iconColor={'#edc589'}
                iconSize={20}
                onChangeText ={(text) => handleChange('waiter_id', text)}
            />
            <Fumi
                style={style.text_input}
                label={'Password'}
                iconClass={MaterialIcons}
                iconName={'lock'}
                iconColor={'#da8c75'}
                iconSize={20}
                secureTextEntry={true}
                onChangeText ={(text) => handleChange('password', text)}
            />
            
            <Btn
                style={style.button}
                label="Login"
                onPress={() => handleLogin(this.btn)}
                ref={ref => (this.btn = ref)}
                foregroundColor={'white'}
                />

        </View>
    );
}
