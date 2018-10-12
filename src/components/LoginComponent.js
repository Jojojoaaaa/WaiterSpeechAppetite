import React from 'react';
import {
    Text , 
    View,
    Image,
    TouchableOpacity,
    Modal,
    Button
    } from 'react-native';
import style from '../styles/LoginStyles';
import img from '../assets/login/Waiter.png';
import settings from '../assets/add.png';
import warning from '../assets/modal/Settings.png';
import tryagain from '../assets/modal/btnChange.png';
import Btn from 'react-native-micro-animated-button';
import {Fumi }  from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

buttonStyles = {
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
        <View style={style.container}>
            <View style={style.body}>
            
                <View style={style.viewStyleOne}>
                <TouchableOpacity 
                onPress={() => {openModal();}}
                >
                <Image
                    style = {style.buttonSettings}
                    source = {settings}>
                    </Image>
                </TouchableOpacity>
                </View>

                <View style={style.viewStyleTwo}>
                <Image
                    source = {img}>
                </Image>
                </View>

                <View style={style.viewStyleThree}>
                <Fumi
                        style={style.text_input}
                        label={'Waiter ID'}
                        iconClass={MaterialIcons}
                        iconName={'account-circle'}
                        iconColor={'black'}
                        iconSize={20}
                        onChangeText ={(text) => handleChange('waiter_id', text)}
                    />
                    <Fumi
                        style={style.text_input}
                        label={'Password'}
                        iconClass={MaterialIcons}
                        iconName={'lock'}
                        iconColor={'black'}
                        iconSize={20}
                        secureTextEntry={true}
                        onChangeText ={(text) => handleChange('password', text)}
                    />

                </View>
                <View style={style.viewStyleFour}>
                <Btn
                        style={buttonStyles}
                        label="Login"
                        onPress={() => handleLogin(this.btn)}
                        ref={ref => (this.btn = ref)}
                        foregroundColor={'white'}
                        />
                {/* <Btn
                        style={buttonStyles}
                        label="Show Modal"
                        onPress={() => openModal(this.btn)}
                        ref={ref => (this.btn = ref)}
                        foregroundColor={'white'}
                        /> */}

                </View>
                
                <Modal
                    visible={modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => closeModal()}
                    transparent={true}
                    >
                    <View style={style.modalContent}>
                        <View style={style.innerContainer}>
                            <Image style={style.imagewarning}
                                source = {warning}>
                            </Image>
                            
                            <Text style={style.textStyle}>Please enter the IP Address to change.</Text>

                            <Fumi
                                style={style.text_input}
                                label={'IP Address'}
                                iconClass={MaterialIcons}
                                iconName={'settings'}
                                iconColor={'black'}
                                iconSize={20}
                            />
                            
                            <TouchableOpacity onPress={() => {closeModal();}}>
                                <Image
                                style={style.buttonModal}
                                    source={tryagain}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* <Modal
                    visible={modalVisible}
                    animationType={'fade'}
                    onRequestClose={() => closeModal()}
                    transparent={true}
                    >
                    <View style={style.modalContent}>
                    
                        <View style={style.innerContainer}>
                        <Image style={style.imagewarning}
                            source = {warning}>
                        </Image>
                        
                        <Text style={style.textStyle}>Waiter ID does not exist!</Text>
                        <TouchableOpacity onPress={() => {closeModal();}}>
                            <Image
                            style={style.buttonModal}
                                source={tryagain}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
            </View>
        </View>
    );
}
