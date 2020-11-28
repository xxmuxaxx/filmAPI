import {deleteCookie} from '../../utils/functions';
import begetApi from '../../api/begetApi';
import usersApi from "../../api/usersApi";

export const fetchCurrentUser = (payload) => async (dispatch) => {
    try {
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
    } catch (e) {
        console.warn(e);

        deleteCookie('token')
        dispatch(setUser(null))
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
