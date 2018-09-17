import React, {Component}from 'react';
import { withRouter } from 'react-router-native'

import OrderActivityComponent from '../components/OrderActivityComponent';

class OrderActivityContainer extends Component {

    render () {
        return (
            <OrderActivityComponent/>
        )
    }
}

export default withRouter(OrderActivityContainer);