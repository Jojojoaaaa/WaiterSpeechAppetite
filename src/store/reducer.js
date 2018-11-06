import * as actionTypes from './actionTypes';
import * as url from '../constants/urls';

const initialState = {
    auth: true,
    waiter_id: '',
    orders_record: [],
    orders_ready_count: 0,
    main_url: url.MAIN_URL
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
        case actionTypes.SET_IP_ADDRESS:
            const main_url = url.MAIN_URL_PREFIX + action.ip_address + url.MAIN_URL_SUFFIX;
            return {...state, main_url: main_url};
        default: 
            return state;
    }
};

export default reducer;