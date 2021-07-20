import React, {useContext, useEffect, useReducer} from 'react'
import reducer from '../reducers/profile_reducer'
import {
    PROFILE_BAR_OPEN,
    PROFILE_BAR_CLOSE,
    HANDLE_PROFILE, LOAD_USER
} from '../actions'

const initialState = {
    isProfileBarOpen: false,
    account: {}
}

const ProfileContext = React.createContext()

export const ProfileProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: LOAD_USER,
        })
    }, [])

    const openProfileBar = () => {
        dispatch({type: PROFILE_BAR_OPEN})
    }
    const closeProfileBar = () => {
        dispatch({type: PROFILE_BAR_CLOSE})
    }

    const handleProfile = (props) => {
        const value = props

        dispatch({
            type: HANDLE_PROFILE,
            payload: value
        })
    }


    return (
        <ProfileContext.Provider
            value={{
                ...state,
                openProfileBar,
                closeProfileBar,
                handleProfile
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    return useContext(ProfileContext)
}
