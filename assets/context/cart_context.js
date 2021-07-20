import React, {useEffect, useContext, useReducer} from 'react'
import reducer from '../reducers/cart_reducer'
import {
    ADD_TO_CART,
    CART_BAR_OPEN,
    CART_BAR_CLOSE,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS, HANDLE_PROMO,
} from '../actions'

const getLocalStorage = () => {
    let cart = localStorage.getItem('cartItems')
    if (cart) {
        return JSON.parse(localStorage.getItem('cartItems'))
    } else {
        return []
    }
}

const initialState = {
    cart: getLocalStorage(),
    total_amount_discount: 0,
    total_amount: 0,
    shipping_fee: 7,
    promo: 0,
    isCartBarOpen: false,
}

const CartContext = React.createContext()

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openCartBar = () => {
        dispatch({
            type: CART_BAR_OPEN
        })
    }
    const closeCartBar = () => {
        dispatch({
            type: CART_BAR_CLOSE
        })
    }

    const handlePromo = (value) => {

        dispatch({
            type: HANDLE_PROMO,
            payload: {
                value,
            },
        })
    }

    const addToCart = (id, product) => {
        dispatch({
            type: ADD_TO_CART,
            payload: {id, product}
        })
    }

    const removeItem = (id) => {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        })
    }

    const toggleAmount = (id, value) => {
        dispatch({
            type: TOGGLE_CART_ITEM_AMOUNT,
            payload: {id, value}
        })
    }

    const clearCart = () => {
        dispatch({
            type: CLEAR_CART
        })
    }

    useEffect(() => {
        // console.log("cart effect")
        localStorage.setItem('cartItems', JSON.stringify(state.cart))
        dispatch({
            type: COUNT_CART_TOTALS
        })
    }, [state.cart])

    return (
        <CartContext.Provider
            value={{
                ...state,
                openCartBar,
                closeCartBar,
                addToCart,
                removeItem,
                toggleAmount,
                clearCart,
                handlePromo
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}
