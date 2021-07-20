import React, {useEffect, useContext, useReducer} from 'react'
import reducer from '../reducers/sort_reducer'
import {
    LOAD_PRODUCTS,
    UPDATE_SORT,
    SORT_PRODUCTS,
} from '../actions'
import {useProductsContext} from './products_context'

const initialState = {
    sorted_products: [],
    sort: 'az'
}

const SortContext = React.createContext()

export const SortProvider = ({children}) => {
    const {products} = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({
            type: LOAD_PRODUCTS,
            payload: products
        })
    }, [products])

    useEffect(() => {
        dispatch({
            type: SORT_PRODUCTS
        })
    }, [products, state.sort])

    const updateSort = (props) => {
        const value = props

        dispatch({
            type: UPDATE_SORT,
            payload: value
        })
    }

    return (
        <SortContext.Provider
            value={{
                ...state,
                updateSort
            }}
        >
            {children}
        </SortContext.Provider>
    )
}

export const useSortContext = () => {
    return useContext(SortContext)
}