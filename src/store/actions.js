import * as actionTypes from './actionTypes';

export const authorizeUser = (waiter_id) => {
    return {
        type: actionTypes.AUTHORIZE_USER,
        waiter_id: waiter_id
    };
};

export const unauthorizeUser = () => {
    return {
        type: actionTypes.UNAUTHORIZE_USER
    }
}

export const setOrdersRecord = (orders_record, orders_ready_count) => {
    return {
        type: actionTypes.SET_ORDERS_RECORD,
        orders_record: orders_record,
        orders_ready_count: orders_ready_count
    }
}
// export const updateOrders = (newOrders) => {
//     return {
//         type: actionTypes.UPDATE_ORDERS,
//         newOrders: newOrders
//     };
// };

// export const setOrders = ()
