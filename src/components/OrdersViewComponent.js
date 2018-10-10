import React from 'react';
import { 
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import StepIndicator from 'react-native-step-indicator';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';

import add from '../assets/add.png';

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
          backgroundColor: 'green',
          onPress: () => {updateOrdersStatus(order_id, status.SERVED)}
        }
      ]

    let orders_entry = (    
        <View style = {styles.order_entry}>     
            <Text>Table Number: {table_number}</Text>
            <Text>Order ID: {order_id}</Text>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={pos}
                labels={labels}
                stepCount={count}
            />
        </View>  
    )
    return (
        (status.READY_CHECK.test(order_status)) 
        ?
        <Swipeout
            left={swipeoutBtns} 
            backgroundColor={'transparent'}
            autoClose={true}> 
            {orders_entry}
        </Swipeout>
        : 
        orders_entry
    )
}
export default function OrdersViewComponent(props) {
    const{
        changeTab,
        goToHome
        } = props;

    const tabs = [
        {
            key: status.READY,
            icon: 'gamepad-variant',
            label: status.READY,
            barColor: '#388E3C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.SERVED,
            icon: 'movie',
            label: status.SERVED,
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.PAID,
            icon: 'music-note',
            label: status.PAID,
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.PENDING,
            icon: 'movie',
            label: status.PENDING,
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: status.ALL,
            icon: 'movie',
            label: status.ALL,
            barColor: '#B71C1C',
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
        <View
            style={styles.container}>
            <TouchableNativeFeedback
                    onPress={() => goToHome()}>
                <Image
                style={styles.image_button}
                source={add}/>
            </TouchableNativeFeedback>
            <ScrollView style={styles.orders_container}>
                {props.children}
            </ScrollView>
            <BottomNavigation
            onTabPress={active_tab => changeTab(active_tab.key)}
            renderTab={renderTab}
            tabs={tabs}
            />
        </View>
      )
}
