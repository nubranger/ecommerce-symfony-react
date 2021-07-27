import React, {useContext, useState, useEffect, useReducer} from 'react'
import reducer from '../reducers/profile_reducer'
import {HANDLE_PROFILE, LOAD_USER, PROFILE_BAR_CLOSE, PROFILE_BAR_OPEN} from '../actions'
import axios from "axios";

const initialState = {
    isProfileBarOpen: false,
    username: "",
    roles: ""
}

const ProfileContext = React.createContext()

export const ProfileProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log(state);

    useEffect(() => {
        dispatch({type: LOAD_USER})
    }, [])

    const openProfileBar = () => {
        dispatch({type: PROFILE_BAR_OPEN})
    }
    const closeProfileBar = () => {
        dispatch({type: PROFILE_BAR_CLOSE})
    }

    const handleProfile = (props) => {
        const {email, password} = props;

        let username;
        let roles;

        if (email === "" || password === "") {
            console.log("error: enter values");
        } else {
            axios.post('/login', {
                    username: email,
                    password: password
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);

                    username = response.data.username;
                    roles = response.data.roles.find(item => {
                        if (item === "ROLE_ADMIN") {
                            return "ROLE_ADMIN";
                        } else {
                            return "ROLE_USER"
                        }
                    });

                    dispatch({
                        type: HANDLE_PROFILE,
                        payload: {username, roles}
                    })
                }).catch(error => {
                if (error.response.data.error) {
                    console.error(error.response.data.error);
                } else {
                    console.error("Unknown error");
                }

            });
        }
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
