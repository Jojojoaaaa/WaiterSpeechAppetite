import React, {Component} from 'react';
import OrdersViewContainer from '../containers/OrdersViewContainer';

import {
    View
} from 'react-native';

export default class OrdersView extends Component {
    constructor (props){
        super(props)
    }
    render() {
        return (
            <View>
                <OrdersViewContainer/>   
            </View>
        )
    }
}