import {deleteCookie, setCookie} from '../../utils/functions';
import begetApi from '../../api/begetApi';
import authApi from "../../api/authApi";
import usersApi from "../../api/usersApi";

export const fetchUser = (payload) => async (dispatch) => {
    const response = await authApi.login(payload)

    if (response.status === 200) {
        setCookie('token', response.data.token);
        dispatch(fetchCurrentUser(response.data.token))
    } else {
        deleteCookie('token')
    }

    return response
};

export const fetchCurrentUser = (payload) => async (dispatch) => {
    const response = await usersApi.getCurrentUser(payload)
    const rolePermissions = []

    response.data.roles.forEach(role => role.rolePermissions.map(perm => rolePermissions.push(perm.authority)))

    if (response.status === 200) {
        const data = {
            ...response.data,
            rolePermissions: [...new Set(rolePermissions)],
            roles: response.data.roles.map(role => role.name),
        }

        dispatch(setUser(data));
    }
}

export const fetchUpdateUserAvatar = (payload) => (dispatch) => {
    begetApi.setUserAvatar(payload).then((data) => dispatch(setUserAvatar(data)));
};

export const setUser = (payload) => ({
    type: 'SET_USER',
    payload,
});

export const setUserAvatar = (payload) => ({
    type: 'SET_USER_AVATAR',
    payload,
});
