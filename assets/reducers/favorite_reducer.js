import {
    HANDLE_FAVORITE,
    FAVORITE_BAR_OPEN,
    FAVORITE_BAR_CLOSE,
    CLEAR_FAVORITE,
} from '../actions'

const favorite_reducer = (state, action) => {

    if (action.type === FAVORITE_BAR_OPEN) {
        return {...state, isFavoriteBarOpen: true}
    }

    if (action.type === FAVORITE_BAR_CLOSE) {
        return {...state, isFavoriteBarOpen: false}
    }

    if (action.type === HANDLE_FAVORITE) {
        const {id, product} = action.payload
        const tempItem = state.favorite.find((i) => i.id === id)

        if (tempItem) {
            const tempFavorite = state.favorite.filter((favoriteItem) => favoriteItem.id !== id)
            return {...state, favorite: tempFavorite}
        } else {
            const newItem = {
                id: id,
                title: product.title,
                price: product.price,
                discount: product.discount,
                img: product.img[0],
                // description: product.description,
                // stock: product.stock,
                // category: product.category,
            }
            return {...state, favorite: [...state.favorite, newItem]}
        }
    }

    if (action.type === CLEAR_FAVORITE) {
        return {...state, favorite: []}
    }

    throw new Error(`Wrong "${action.type}" - action type`)
}

export default favorite_reducer
