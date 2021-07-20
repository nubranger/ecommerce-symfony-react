import axios from 'axios'
import React, {useContext, useEffect, useReducer} from 'react'
import reducer from '../reducers/products_reducer'
import data from "../data";
//import {products_url} from "../constants";

import {
    // GET_PRODUCTS_BEGIN,
    // GET_PRODUCTS_SUCCESS,
    // GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
    products_loading: false,
    products_error: false,
    // products: [],
    products: data,
    loved_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // const fetchProducts = async (url) => {
    //     dispatch({
    //         type: GET_PRODUCTS_BEGIN
    //     })
    //
    //     try {
    //         const response = await axios.get(url)
    //         const products = response.data
    //         dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
    //     } catch (error) {
    //         dispatch({type: GET_PRODUCTS_ERROR})
    //     }
    // }

    const fetchSingleProduct = async (url) => {
        dispatch({
            type: GET_SINGLE_PRODUCT_BEGIN
        })

        try {
            const response = await axios.get(url)
            const singleProduct = response.data
            dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
        } catch (error) {
            dispatch({type: GET_SINGLE_PRODUCT_ERROR})
        }
    }

    useEffect(() => {
        // fetchProducts(products_url)
    }, [])

    return (
        <ProductsContext.Provider
            value={{
                ...state,
                fetchSingleProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    return useContext(ProductsContext)
}
