import * as actionTypes from './actionTypes';

export const authorizeUser = (waiter_id) => {
    return {
        type: actionTypes.AUTHORIZE_USER,
        waiter_id: waiter_id
    };
};

export const updateOrders = (newOrders) => {
    return {
        type: actionTypes.UPDATE_ORDERS,
        newOrders: newOrders
    };
};