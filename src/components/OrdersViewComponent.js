import React from 'react';
import { 
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import StepIndicator from 'react-native-step-indicator';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';

import back from '../assets/orderview/btnBack.png';
import header from '../assets/orderview/header.png';
import close from '../assets/orderview/btnClose.png';
import illus from '../assets/orderview/Confirm.png';


import * as status from '../constants/type';

import styles, {customStyles} from '../styles/OrderViewStyles';


const labels = [status.PENDING, status.READY, status.SERVED, status.PAID];
const count = 4;

export function OrdersEntry(props) {
    const {
        pos,
        table_number,
        order_id,
        order_status,
        updateOrdersStatus
    } = props;

    var swipeoutBtns = [
        {
          text: 'Serve',
          backgroundColor: '#4B9051',
          onPress: () => {updateOrdersStatus(order_id, status.SERVED)}
        }
      ]

    let orders_entry = (    
            <View style = {styles.entry}>
                <Text style={{marginBottom:5}}>Table Number: {table_number}</Text>
                <Text style={{marginBottom:15}}>Order ID: {order_id}</Text>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={pos}
                    labels={labels}
                    stepCount={count}
                />
           
        </View>  
    )
    return (
        <View style = {styles.order_entry}>
        {(status.READY_CHECK.test(order_status)) 
        ?
            <Swipeout
                left={swipeoutBtns} 
                backgroundColor={'transparent'}
                autoClose={true}> 
                {orders_entry}
            <View style={style.instruction}>
                <Text>Swipe right to serve >>   </Text>
            </View>          
            </Swipeout>
        : 
        orders_entry}
        </View>
    )
}
export function EmptyOrders(props) {
    return (
        <View style={style.empty_orders}>
            <Text>No orders for now</Text>
        </View>  
    );
}

export default function OrdersViewComponent(props) {
    const{
        changeTab,
        goToHome,
        modal_visible,
        closeModal
        } = props;

    const tabs = [
        {
            key: status.READY,
            icon: 'gamepad-variant',
            label: status.READY,
            barColor: '#DA8C75',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.PENDING,
            icon: 'movie',
            label: status.PENDING,
            barColor: '#C05B5A',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.ALL,
            icon: 'movie',
            label: status.ALL,
            barColor: '#4F4F4F',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.SERVED,
            icon: 'movie',
            label: status.SERVED,
            barColor: '#EDC589',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.PAID,
            icon: 'music-note',
            label: status.PAID,
            barColor: '#84BD93',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }   
    ]
    
    renderIcon = icon => ({ isActive }) => (
        <View></View>
    //<Icon size={24} color="white" name={tab.icon} />
    )

    const renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image 
                    style={style.bg}
                    source={header}></Image>
                <TouchableNativeFeedback onPress={() => goToHome()}>
                    <Image
                    style={styles.image_button}
                    source={back}/>
                </TouchableNativeFeedback>
                <View style={styles.boxOne}>
                    <ScrollView 
                        style={styles.orders_container}>
                        {props.children}
                    </ScrollView>
                </View>
                    <BottomNavigation
                    onTabPress={active_tab => changeTab(active_tab.key)}
                    renderTab={renderTab}
                    tabs={tabs}
                    /> 
                <Modal
                    visible={modal_visible}
                    animationType={'fade'}
                    onRequestClose={() => closeModal()}
                    transparent={true}
                    >
                    <View style={style.modalContent}>
                        <View style={style.innerContainer}>
                            <Image style={style.imagewarning}
                                source = {illus}>
                            </Image>
                            
                            <Text style={style.textModal}>The order has been served.</Text>
                            
                            <TouchableOpacity onPress={() => {closeModal();}}>
                                <Image
                                style={style.buttonModal}
                                    source={close}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    
            </View>
        </View>
      )
}
