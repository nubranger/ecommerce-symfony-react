import React, {useEffect, useContext, useReducer} from 'react'
import reducer from '../reducers/filter_reducer'
import {
    LOAD_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'
import {useSortContext} from "./sort_context";
import {useProductsContext} from "./products_context";

const initialState = {
    products: [],
    filtered_products: [],
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
    },
}

const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {

    const {sorted_products} = useSortContext();
    const {products} = useProductsContext();
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({
            type: LOAD_PRODUCTS,
            payload: sorted_products, products
        })
    }, [products, sorted_products])

    useEffect(() => {
        dispatch({type: FILTER_PRODUCTS})
    }, [sorted_products, state.filters])

    const updateFilters = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'category') {
            value = e.target.textContent
        }
        if (name === 'color') {
            value = e.target.dataset.color
        }
        if (name === 'price') {
            value = Number(value)
        }
        if (name === 'shipping') {
            value = e.target.checked
        }
        dispatch({type: UPDATE_FILTERS, payload: {name, value}})
    }
    const clearFilters = () => {
        dispatch({type: CLEAR_FILTERS})
    }
    return (
        <FilterContext.Provider
            value={{
                ...state,
                updateFilters,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}