import React, {Component} from 'react';
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux';

import axios from '../axios';
import * as url from '../constants/urls';
import * as status from '../constants/type';
import OrdersViewComponent, {OrdersEntry} from '../components/OrdersViewComponent';

class OrdersViewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           orders_pending: [],
           orders_ready: [],
           orders_served: [],
           orders_paid: [],
           current_orders_view: []
        };
    }
    componentWillMount() {
        console.log('Will mount', this.props.orders_record);
        this.groupOrders();
        console.log('Orders View 2');
    }
    groupOrders = () => {
        const orders = this.props.orders_record;
        let orders_pending = [];
        let orders_ready = [];
        let orders_served = [];
        let orders_paid = [];
        orders.forEach(order => {
            if (status.PENDING_CHECK.test(order.status)){
                order.pos = 0;
                orders_pending.push(order);
            }
            if (status.READY_CHECK.test(order.status)){
                order.pos = 1;
                orders_ready.push(order);
            }
            if (status.SERVED_CHECK.test(order.status)){
                order.pos = 2;
                orders_served.push(order);
            }
            if (status.PAID_CHECK.test(order.status)){
                order.pos = 3;
                orders_paid.push(order);
            }
        });
        this.setState({
            orders_pending : orders_pending,
            orders_ready : orders_ready,
            orders_served : orders_served,
            orders_paid : orders_paid,
            current_orders_view: orders
        });
        console.log('Orders View 1');
        console.log('Will mount 2', orders);
    }
    render() {
        const { current_orders_view } = this.state;
        console.log('Render', current_orders_view);
        const orders_view = current_orders_view.map(order => {
            return (
                <OrdersEntry
                    key = {order.order_id}
                    pos = {order.pos}
                    table_number = {order.table_number}
                    order_id = {order.order_id}
                />
            )
        });

        return(
            <OrdersViewComponent>
            {current_orders_view.map(order => {
            return (
                <OrdersEntry
                    key = {order.order_id}
                    pos = {order.pos}
                    table_number = {order.table_number}
                    order_id = {order.order_id}
                />
            )
        })}
            </OrdersViewComponent>
        )
    }
}

mapStateToProps = state => {
    return {
        auth: state.auth,
        waiter_id: state.waiter_id,
        orders_ready_count: state.orders_ready_count,
        orders_record: state.orders_record
    };
};
 export default connect(mapStateToProps) (withRouter(OrdersViewContainer));