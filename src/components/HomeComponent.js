import React from 'react';
import {
    View, 
    Text, 
    Image,
    TouchableNativeFeedback,
    TouchableOpacity,
    Modal} from 'react-native';
import style from '../styles/HomeStyles';
import exit from '../assets/home/exit.png';
import order from '../assets/home/btnOrders.png';
import mic from '../assets/home/btnMic.png';
import bg from '../assets/home/homebg.png';
import dine from '../assets/home/btnDine.png';
import out from '../assets/home/btnOut.png';
import type from '../assets/login/settings.png';
import illus from '../assets/home/illustration.png';

import IconBadge from 'react-native-icon-badge';

export default function HomeComponent(props) {
    const {
        speechHandler,
        viewOrders,
        logOutHandler,
        orders_ready_count,
        modalVisible,
        openModal,
        closeModal} = props;
    return (
        <View style = {style.container}>
            <View style = {style.body}>
                <Image
                    style={style.bg}
                    source={bg}>
                </Image>

                <View style={style.boxOne}>
                    <TouchableOpacity
                        onPress={() => logOutHandler()}>
                        <Image
                            source={exit}>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => openModal()}>
                        <Image
                            source={type}>
                        </Image>
                    </TouchableOpacity>

                    <IconBadge
                        MainElement={
                            <TouchableOpacity
                                onPress={() => viewOrders()}>
                                <Image
                                    style={{marginRight:10, marginTop:6}}
                                    source={order}>
                                </Image>
                            </TouchableOpacity>
                        }
                        BadgeElement={
                        <Text style={{color:'#FFFFFF', fontSize: 12}}>
                        {orders_ready_count}
                        </Text>
                        }
                        IconBadgeStyle={
                        {width:15,
                        height:20,
                        
                        backgroundColor: '#CE593F'}
                        }
                        Hidden={orders_ready_count==0}
                        />
                    </View>

                <View style={style.filler}></View>

                <View style = {style.boxTwo}>
                    <Text style={style.textHeading}>Create Order</Text>
                    <Text>Tap the button to create order</Text>
                    <TouchableNativeFeedback
                        onPress={() => speechHandler()}>
                        <Image
                            style={style.image}
                            source={mic}/>
                    </TouchableNativeFeedback>   
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
                                    source = {illus}>
                                </Image>
                                
                                <Text style={style.textModal}>Choose the type of order</Text>
                                
                                <TouchableOpacity onPress={() => {closeModal();}}>
                                    <Image
                                    style={style.buttonModal}
                                        source={dine}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {closeModal();}}>
                                    <Image
                                    style={style.buttonModal}
                                        source={out}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>


            </View>
        </View>
    )
}
