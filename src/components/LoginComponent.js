import React from 'react';
import {
    Text , 
    View,
    Image,
    TouchableOpacity,
    Modal
    } from 'react-native';
import style from '../styles/LoginStyles';
import img from '../assets/SAI.png';
import Btn from 'react-native-micro-animated-button';
import {Fumi }  from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

buttonStyles = {
    marginTop: 5,
    width:150,
    backgroundColor: '#da8c75',
    borderColor: 'transparent'   
}

export default function LoginComponent(props) {
    const { handleLogin,
            handleChange,
            modalVisible,
            openModal,
            closeModal
            } = props;
    
    return (
        <View>
        <View style={style.container}>
            <View style={style.viewStyleOne}>
                <Image style={style.image}
                source = {img}>
                </Image>
            </View>

            <View style={style.viewStyleTwo}>
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

            </View>
            <View style={style.viewStyleThree}>
            <TouchableOpacity onPress = {() => handleLogin(this.btn)}>            
                <Btn
                        style={buttonStyles}
                        label="Login"
                        onPress={() => handleLogin(this.btn)}
                        ref={ref => (this.btn = ref)}
                        foregroundColor={'white'}
                        />
            </TouchableOpacity>
            <Btn
                     style={buttonStyles}
                     label="Show Modal"
                     onPress={() => openModal(this.btn)}
                     ref={ref => (this.btn = ref)}
                     foregroundColor={'white'}
                     />

            </View>
            {/* in conflict, choose mae's */}
            {props.children}
        </View>
    </View>
    );
}
