const initialState = {
    auth: true,
    waiter_id: ''
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case 'AUTHORIZE_USER':
            return {...state, auth: true, waiter_id: action.waiter_id};
        default: 
            return state;
    }
};

export default reducer;