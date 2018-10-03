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
import warning from '../assets/modal/Warning.png';
import tryagain from '../assets/modal/btnTryAgain.png';
import Btn from 'react-native-micro-animated-button';
import {Fumi }  from 'react-native-textinput-effects';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



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
            <Btn
                     style={style.button}
                     label="Login"
                     onPress={() => handleLogin(this.btn)}
                     ref={ref => (this.btn = ref)}
                     foregroundColor={'white'}
                     />
            <Btn
                     style={style.button}
                     label="Show Modal"
                     onPress={() => openModal(this.btn)}
                     ref={ref => (this.btn = ref)}
                     foregroundColor={'white'}
                     />

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
                    
                    <Text style={style.textStyle}>Waiter ID does not exist!</Text>
                     <TouchableOpacity onPress={() => {closeModal();}}>
                        <Image
                        style={style.buttonModal}
                            source={tryagain}
                        />
                     </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    </View>
    );
}
