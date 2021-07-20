import {
    LOAD_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

    if (action.type === LOAD_PRODUCTS) {

        let maxPrice = action.payload.map((p) => p.price)
        maxPrice = Math.max(...maxPrice)

        return {
            ...state,
            sorted_products: [...action.payload],
            products: [...action.payload],
            filters: {...state.filters, max_price: maxPrice, price: maxPrice},
        }
    }

    if (action.type === UPDATE_FILTERS) {
        const {name, value} = action.payload
        return {...state, filters: {...state.filters, [name]: value}}
    }
    if (action.type === FILTER_PRODUCTS) {
        const {sorted_products} = state
        const {text, category, company, color, price, shipping} = state.filters

        let tempProducts = [...sorted_products]
        // filtering
        // text
        if (text) {
            tempProducts = tempProducts.filter((product) => {
                return product.name.toLowerCase().startsWith(text)
            })
        }
        // category
        if (category !== 'all') {
            tempProducts = tempProducts.filter(
                (product) => product.category === category
            )
        }

        // company
        if (company !== 'all') {
            tempProducts = tempProducts.filter(
                (product) => product.company === company
            )
        }
        // colors
        if (color !== 'all') {
            tempProducts = tempProducts.filter((product) => {
                return product.colors.find((c) => c === color)
            })
        }
        // price
        tempProducts = tempProducts.filter((product) => product.price <= price)
        // shipping
        if (shipping) {
            tempProducts = tempProducts.filter((product) => product.shipping === true)
        }

        return {...state, filtered_products: tempProducts}
    }
    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                ...state.filters,
                text: '',
                company: 'all',
                category: 'all',
                color: 'all',
                price: state.filters.max_price,
                shipping: false,
            },
        }
    }
    throw new Error(`Wrong "${action.type}" - action type`)
}

export default filter_reducer