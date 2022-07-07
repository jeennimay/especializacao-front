type ActionType = {
    type: string,
    payload?:any
}


const initalState = {
    isFetching: false,
    products: [],
    errorMessage: undefined,
};


export const fetchProductsReducer = (state = initalState, action: ActionType) : object => {
    switch(action.type){
        case 'FETCH_PRODUCTS_START':
            return {
                ...state,
                isFeching: true,
            };

        case 'FETCH_PRODUCTS_SUCCESS':
             return {
                ...state,
                errorMessage: initalState.errorMessage,
                isFetching: false,
                products: action.payload.products,
            };

        case 'FETCH_PRODUCTS_ERROR':
            return {
                ...state,
                products: initalState.products,
                isFetching: false,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
}