import React from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
    Text} from 'react-native';

import style from '../styles/OptionPromptStyles';
import * as type from '../constants/type';

import illustration from '../assets/home/illustration.png';
import dine from '../assets/home/btnDine.png';
import out from '../assets/home/btnOut.png';
import confirm from '../assets/modal/confirm.png';
import modify from '../assets/modal/modify.png';
import home from '../assets/modal/home.png';
import stay from '../assets/modal/stay.png';


export default function OptionPromptComponent(props) {
       const {
            prompt_type,
            modal_visible,
            closeModal,
            prompt_message,
            optionOne,
            optionTwo
       } = props;
       let optionOneImage = "";
       let optionTwoImage ="";

      switch (prompt_type) {
          case type.ORDER_TYPE:
            optionOneImage = dine;
            optionTwoImage = out;
            break;
          case type.ORDER_CONFIRMATION:
            optionOneImage = confirm;
            optionTwoImage = modify;
            break;
          case type.GO_HOME:
            optionOneImage = home;
            optionTwoImage = stay;
            break; 
      }
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
                    
                    <TouchableOpacity onPress={() => optionOne(type.DINE_IN)}>
                        <Image
                        style={style.buttonModal}
                            source={optionOneImage}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => optionTwo(type.TAKE_OUT)}>
                        <Image
                        style={style.buttonModal}
                            source={optionTwoImage}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}