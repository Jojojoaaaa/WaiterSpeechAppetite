import React, {Component} from 'react';
import { withRouter } from 'react-router-native'

import OrdersViewComponent from '../components/OrdersViewComponent';

class OrdersViewContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <OrdersViewComponent/>
        )
    }
 }

 export default withRouter(OrdersViewContainer);