import React from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
    Text} from 'react-native';

import style from '../styles/OptionPromptStyles';
import * as order_type from '../constants/type';

import illustration from '../assets/home/illustration.png';
import dine from '../assets/home/btnDine.png';
import out from '../assets/home/btnOut.png';

export default function OptionPromptComponent(props) {
       const {
            type,
            modal_visible,
            closeModal,
            prompt_message,
            optionOne,
            optionTwo
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
                        source = {illustration}>
                    </Image>
                    
                    <Text style={style.textModal}>{prompt_message}</Text>
                    
                    <TouchableOpacity onPress={() => optionOne(order_type.DINE_IN)}>
                        <Image
                        style={style.buttonModal}
                            source={dine}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => optionTwo(order_type.TAKE_OUT)}>
                        <Image
                        style={style.buttonModal}
                            source={out}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}