import {
    PROFILE_BAR_OPEN,
    PROFILE_BAR_CLOSE,
    HANDLE_PROFILE,
    LOAD_USER
} from '../actions'

const profile_reducer = (state, action) => {

    if (action.type === LOAD_USER) {

        let username = "";
        let roles = "";

        if (window.user) {
            let user = window.user;
            username = user.username;
            roles = user.roles[0];
        }

        return {...state, username: username, roles: roles}
    }

    if (action.type === HANDLE_PROFILE) {
        const {username, roles} = action.payload;
        return {...state, username, roles, isProfileBarOpen: false};
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
