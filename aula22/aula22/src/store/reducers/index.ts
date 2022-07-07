import { combineReducers } from "redux";

import { fetchProductsReducer } from "./products";

export default combineReducers({
    product: fetchProductsReducer,
});