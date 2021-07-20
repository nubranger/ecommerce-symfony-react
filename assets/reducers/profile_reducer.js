import {
    PROFILE_BAR_OPEN,
    PROFILE_BAR_CLOSE,
    HANDLE_PROFILE,
    LOAD_USER
} from '../actions'
import axios from "axios";

const profile_reducer = (state, action) => {

    if (action.type === LOAD_USER) {
        let account = {};

        if (window.user) {
            let user = window.user;
            console.log(user);
            account = {username: user.username, roles: user.roles};
        }

        return {...state, account: account}
    }

    if (action.type === HANDLE_PROFILE) {

        const {email, password} = state;
        let account = {};

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
                    // console.log(response.headers);

                    account = {username: response.headers.username, roles: response.headers.roles};
                }).catch(error => {
                if (error.response.data.error) {
                    console.error(error.response.data.error);
                } else {
                    console.error("Unknown error");
                }

            }).finally(() => {

            })

        }

        return {...state, account: account}
    }

    if (action.type === PROFILE_BAR_OPEN) {
        return {...state, isProfileBarOpen: true}
    }

    if (action.type === PROFILE_BAR_CLOSE) {
        return {...state, isProfileBarOpen: false}
    }
    throw new Error(`Wrong "${action.type}" - action type`)
}

export default profile_reducer
