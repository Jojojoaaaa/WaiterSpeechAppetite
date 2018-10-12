import React from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
    Text} from 'react-native';

import warning from '../assets/modal/Warning.png';
import tryagain from '../assets/modal/btnTryAgain.png';

import style from '../styles/ErrorPromptStyles';

export default function ErrorPromptComponent(props) {
    const {hasError, errorMessage, handleError} = props;
       
    return (
        <Modal
            visible={hasError}
            animationType={'fade'}
            onRequestClose={() => handleError()}
            transparent={true}
            >
            <View style={style.modalContent}>
                
                <View style={style.innerContainer}>
                <Image style={style.imagewarning}
                    source = {warning}>
                </Image>
                
                <Text style={style.textStyle}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => handleError()}>
                    <Image
                    style={style.buttonModal}
                        source={tryagain}
                    />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>    
    );
}