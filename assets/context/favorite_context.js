import React, {useEffect, useContext, useReducer} from 'react'
import reducer from '../reducers/favorite_reducer'
import {
    HANDLE_FAVORITE,
    FAVORITE_BAR_OPEN,
    FAVORITE_BAR_CLOSE,
    CLEAR_FAVORITE,
} from '../actions'

const getLocalStorage = () => {
    let favorite = localStorage.getItem('favoriteItems')
    if (favorite) {
        return JSON.parse(localStorage.getItem('favoriteItems'))
    } else {
        return []
    }
}

const initialState = {
    favorite: getLocalStorage(),
    total_items: 0,
    isFavoriteBarOpen: false,
}

const FavoriteContext = React.createContext()

export const FavoriteProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openFavoriteBar = () => {
        dispatch({type: FAVORITE_BAR_OPEN})
    }
    const closeFavoriteBar = () => {
        dispatch({type: FAVORITE_BAR_CLOSE})
    }

    const handleFavorite = (id, product) => {
        dispatch({
            type: HANDLE_FAVORITE,
            payload: {id, product}
        })
    }

    const clearFavorite = () => {
        dispatch({
            type: CLEAR_FAVORITE
        })
    }

    useEffect(() => {
        // console.log("favorite effect")
        localStorage.setItem('favoriteItems', JSON.stringify(state.favorite))

    }, [state.favorite])

    return (
        <FavoriteContext.Provider
            value={{...state, openFavoriteBar, closeFavoriteBar, handleFavorite, clearFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export const useFavoriteContext = () => {
    return useContext(FavoriteContext)
}
