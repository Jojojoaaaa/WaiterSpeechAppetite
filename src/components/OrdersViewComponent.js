import React from 'react';
import { 
    View,
    Text,
    ScrollView
} from 'react-native';

import StepIndicator from 'react-native-step-indicator';

import styles, {customStyles} from '../styles/OrderViewStyles';

import * as status from '../constants/type';

const labels = [status.PENDING, status.READY, status.SERVED, status.PAID];
const count = 4;

export function OrdersEntry(props) {
    const {
        pos,
        table_number,
        order_id,
    } = props;
    return (
        <View>
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
}

export default function OrdersViewComponent(props) {

    return (
        <ScrollView style={styles.orders_container}>
            {props.children}
        </ScrollView>
      )
}