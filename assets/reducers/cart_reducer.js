import {
    ADD_TO_CART,
    CART_BAR_CLOSE,
    CART_BAR_OPEN,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    HANDLE_PROMO,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

    if (action.type === CART_BAR_OPEN) {
        return {...state, isCartBarOpen: true}
    }
    if (action.type === CART_BAR_CLOSE) {
        return {...state, isCartBarOpen: false}
    }

    if (action.type === ADD_TO_CART) {
        const {id, product} = action.payload
        const tempItem = state.cart.find((i) => i.id === id)

        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {

                if (cartItem.id === id) {

                    let newAmount = cartItem.amount + 1

                    if (newAmount > cartItem.stock) {
                        newAmount = cartItem.stock
                    }
                    return {...cartItem, amount: newAmount}
                } else {
                    return cartItem
                }
            })
            return {...state, cart: tempCart}
        } else {
            const newItem = {
                id: id,
                title: product.title,
                description: product.description,
                price: product.price,
                discount: product.discount,
                img: product.img,
                stock: product.stock,
                category: product.category,
                amount: 1
            }
            return {...state, cart: [...state.cart, newItem]}
        }
    }

    if (action.type === REMOVE_CART_ITEM) {
        const tempCart = state.cart.filter((item) => item.id !== action.payload)
        return {...state, cart: tempCart}
    }

    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const {id, value} = action.payload;

        const tempCart = state.cart.map((item) => {
            if (item.id === id) {
                console.log(parseInt(value));
                if (Number.isInteger(parseInt(value))) {
                    let newAmount = value
                    if (newAmount > item.stock) {
                        newAmount = item.stock
                    }
                    return {...item, amount: newAmount}
                }
                if (value === 'inc') {
                    let newAmount = item.amount + 1
                    if (newAmount > item.stock) {
                        newAmount = item.stock
                    }
                    return {...item, amount: newAmount}
                }
                if (value === 'dec') {
                    let newAmount = item.amount - 1
                    if (newAmount < 1) {
                        newAmount = 1
                    }
                    return {...item, amount: newAmount}
                }
            }
            return item
        })
        return {...state, cart: tempCart}
    }

    if (action.type === HANDLE_PROMO) {
        const {value} = action.payload;

        let tempPromo = 0;
        if (value === "777") {
            tempPromo = 20;
        }

        return {...state, promo: tempPromo}
    }

    if (action.type === CLEAR_CART) {
        return {...state, cart: []}
    }

    if (action.type === COUNT_CART_TOTALS) {

        let count = state.cart.map(item => {
            let prices = null;

            if (item.price && item.discount) {
                prices = item.discount * item.amount
            }
            if (item.price && !item.discount) {
                prices = item.price * item.amount
            }

            return prices;
        });


        let countFull = state.cart.map(item => {
            return item.price * item.amount;
        });

        let total_amount_discount = 0;
        let total_amount = 0;

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if (count.length > 0) {
            total_amount_discount = count.reduce(reducer).toFixed(2);
        }
        if (countFull.length > 0) {
            total_amount = countFull.reduce(reducer).toFixed(2);
        }
        return {...state, total_amount_discount, total_amount}
    }
    throw new Error(`Wrong "${action.type}" - action type`)
}

export default cart_reducer
