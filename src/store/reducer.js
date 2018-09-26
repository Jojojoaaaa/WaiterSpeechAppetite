import * as actionTypes from './actionTypes';

const initialState = {
    auth: false,
    waiter_id: '',
    orders: [],
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTHORIZE_USER:
            return {...state, auth: true, waiter_id: action.waiter_id};
        case actionTypes.UPDATE_ORDERS: 
            const new_orders = [...action.newOrders];
            const state_orders = [...state.orders];
            const orders = state_orders.concat(new_orders);
            return {...state, orders: orders} ;          
        default: 
            return state;
    }
};

export default reducer;