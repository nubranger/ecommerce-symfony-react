import {
    SORT_PRODUCTS,
    UPDATE_SORT,
    LOAD_PRODUCTS
} from '../actions'

const sort_reducer = (state, action) => {

    if (action.type === LOAD_PRODUCTS) {

        return {
            ...state,
            sorted_products: [...action.payload],
        }
    }

    if (action.type === UPDATE_SORT) {
        return {...state, sort: action.payload}
    }
    if (action.type === SORT_PRODUCTS) {
        const {sort, sorted_products} = state;
        let tempProducts = [...sorted_products];

        tempProducts = tempProducts.map((item) => {
            let sortedPrices = null;

            if (item.price && item.discount) {
                sortedPrices = {...item, sortedPrices: item.discount}
            }
            if (item.price && !item.discount) {
                sortedPrices = {...item, sortedPrices: item.price}
            }

            return sortedPrices;
        });

        if (sort === "priceUp") {
            tempProducts = tempProducts.sort((a, b) => {
                return a.sortedPrices - b.sortedPrices
            });
        }

        if (sort === "priceDown") {
            tempProducts = tempProducts.sort((a, b) => {
                return b.sortedPrices - a.sortedPrices
            });
        }

        if (sort === "az") {
            tempProducts = tempProducts.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
        }

        if (sort === "za") {
            tempProducts = tempProducts.sort((a, b) => {
                return b.title.localeCompare(a.title)
            })
        }

        return {...state, sorted_products: tempProducts};
    }

    throw new Error(`Wrong "${action.type}" - action type`)
}

export default sort_reducer