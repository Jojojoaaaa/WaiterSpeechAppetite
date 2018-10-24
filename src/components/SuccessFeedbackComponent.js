import React from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
    Text} from 'react-native';

import style from '../styles/SuccessFeedbackStyles';

import close from '../assets/orderview/btnClose.png';
import image from '../assets/orderview/Confirm.png';

export default function SuccessFeedbackComponent(props) {
    const {
        modal_visible,
        buttonHandler,
        feedback,
    } = props; 
    return (
        <Modal
            visible={modal_visible}
            animationType={'fade'}
            onRequestClose={() => closeModal()}
            transparent={true}
            >
            <View style={style.modalContent}>
                <View style={style.innerContainer}>
                    <Image style={style.image}
                        source = {image}>
                    </Image>
                    
                    <Text style={style.textModal}>{feedback}</Text>
                    
                    <TouchableOpacity onPress={() => buttonHandler()}>
                        <Image
                        style={style.buttonModal}
                            source={close}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}