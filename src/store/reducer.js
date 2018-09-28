import * as actionTypes from './actionTypes';

const initialState = {
    auth: false,
    waiter_id: '',
    orders_record: [],
    orders_ready_count: 0
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTHORIZE_USER:
            return {...state, auth: true, waiter_id: action.waiter_id};

        case actionTypes.UNAUTHORIZE_USER: 
            return initialState;    
            
        case actionTypes.SET_ORDERS_RECORD:
            const orders_record = action.orders_record;
            const orders_ready_count = action.orders_ready_count;  
            return {...state, orders_record: orders_record, 
                        orders_ready_count: orders_ready_count};
        // case actionTypes.UPDATE_ORDERS: 
        //     const new_orders = [...action.newOrders];
        //     const state_orders = [...state.orders];
        //     const orders = state_orders.concat(new_orders);
        //     return {...state, orders: orders}; 

        default: 
            return state;
    }
};

export default reducer;