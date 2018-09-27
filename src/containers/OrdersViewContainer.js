import React, {Component} from 'react';
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux';

import axios from '../axios';
import * as url from '../constants/urls';

import OrdersViewComponent from '../components/OrdersViewComponent';

class OrdersViewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders_record: []
        };
    }
    componentWillMount() {
        
    }
    
    render() {
        return(
            <OrdersViewComponent/>
        )
    }
 }

 export default withRouter(OrdersViewContainer);