export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

type Products = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating:
    {
        rate: number,
        count: number,
    }
}

export const fetchProductsStarted = () => {
    return {
        type: 'FETCH_PRODUCTS_START',
    };
}

export const fetchProductsSuccess = (products: Products[]) => {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: { products },
    };
}

export const fetchProductsError = (errorMessage: string) => {
    return {
        type: 'FETCH_PRODUCTS_ERROR',
        payload: { errorMessage },
    };
}

export const fetchProductsThunk = () => async (dispatch: any) => {
    dispatch(fetchProductsStarted());
    await new Promise(resolve => setTimeout(resolve, 200));
    try {
        const response = await fetch('http://localhost:3001/products');
        const dataJson = await response.json();
        dispatch(fetchProductsSuccess(dataJson));
    } catch (error: any) {
        dispatch(fetchProductsError(error.message));
    }
}

export const filterProductsThunk = (text: string) => async (dispatch: any) => {
    dispatch(fetchProductsStarted());
    try {
        const response = await fetch(`http://localhost:3001/products?title_like=${text}`);
        const dataJson = await response.json();
        dispatch(fetchProductsSuccess(dataJson));
    } catch (error: any) {
        dispatch(fetchProductsError(error.message));
    }
}