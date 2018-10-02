import React, {Component} from 'react';
import {View, Alert } from 'react-native'
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux';

import axios from '../axios';
import * as url from '../constants/urls';
import * as status from '../constants/type';
import * as  routes from '../constants/routes';

import * as  actions from '../store/actions';

import OrdersViewComponent, {OrdersEntry} from '../components/OrdersViewComponent';

class OrdersViewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           orders_pending: [],
           orders_ready: [],
           orders_served: [],
           orders_paid: [],
           current_orders_view: [],
           active_tab: status.READY
        };
    }
    componentWillMount() {
        this.groupOrders();
    }
    componentDidMount(){
        this.getAllOrdersRecord();
        this.updateCurrentView();
    }
    componentWillUnmount() {
        clearTimeout(this.update);
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
        });
       console.log('re render');
    }
    getAllOrdersRecord = () => {
        const post_data = {waiter_id: this.props.waiter_id}

          axios.post(this.props.main_url + url.RETRIEVE_ORDERS, post_data)
            .then(response => {
                const orders_record = response.data;
                let orders_ready_count = 0;

                orders_record.forEach(o => {
                  orders_ready_count += status.READY_CHECK.test(o.status) ? 1 : 0;
                });
                this.props.onSetOrders(orders_record, orders_ready_count);
            })
        this.groupOrders();
        this.updateCurrentView();
       this.update =  setTimeout(this.getAllOrdersRecord, 2000);
    }
    changeTab = (active_tab) => {
        this.setState({
            active_tab: active_tab
        }, () =>   this.updateCurrentView());
    }
    updateCurrentView = () => {
        const {
            orders_ready,
            orders_served,
            orders_paid,
            orders_pending,
            active_tab} = this.state;
    
        const orders = this.props.orders_record;
        let current_orders_view = [];

        if (status.READY_CHECK.test(active_tab)){
            current_orders_view = orders_ready;
        }
        else if (status.SERVED_CHECK.test(active_tab)){
            current_orders_view = orders_served;
        }
        else if (status.PAID_CHECK.test(active_tab)){
            current_orders_view = orders_paid;
        }
        else if (status.PENDING_CHECK.test(active_tab)) {
            current_orders_view = orders_pending;
        }
        else {
            current_orders_view = orders;
        }
        this.setState({
            current_orders_view: current_orders_view,
        })
    }
    goToHome = () => {
        this.props.history.push(routes.HOME);
    }

    updateOrdersStatus = (orders_id, status_update) => {
        const post_data = {
            order_id: orders_id,
            status_update: status_update
        };
        axios.post(this.props.main_url+url.UPDATE_ORDERS_STATUS, post_data)
            .then(response => {
                if (response.data > 0) {
                    Alert.alert('*check icon*');
                }
                else {
                    Alert.alert('*error icon*');
                }
            })
            .catch(response =>{
                Alert.alert('*error*');
            })
    }
    render() {
        const { current_orders_view } = this.state;
        const changeTab = this.changeTab;
        const goToHome = this.goToHome;
        const updateOrdersStatus = this.updateOrdersStatus;

        const orders_view = current_orders_view.map(order => {
            return (
                <OrdersEntry
                    key = {order.order_id}
                    pos = {order.pos}
                    table_number = {order.table_number}
                    order_id = {order.order_id}
                    order_status = {order.status}
                    updateOrdersStatus = {updateOrdersStatus}
                />
            )
        });
        return(
            <OrdersViewComponent
                changeTab={changeTab}
                goToHome={goToHome}>
            {orders_view}
            </OrdersViewComponent>
        )
    }
}

mapStateToProps = state => {
    return {
        auth: state.auth,
        waiter_id: state.waiter_id,
        orders_ready_count: state.orders_ready_count,
        orders_record: state.orders_record,
        main_url: state.main_url
    };
};
mapDispatchToProps = dispatch => {
    return {
      onSetOrders: (orders_record, orders_ready_count) => dispatch(actions.setOrdersRecord(orders_record, orders_ready_count))
    }
  }
 export default connect(mapStateToProps, mapDispatchToProps) (withRouter(OrdersViewContainer));