import cookie from 'cookie';
import Cookies from 'js-cookie'; // for server-side cookie parsing
import { NavigateFunction } from 'react-router-dom';
import api from '@/api';

export const isLoggedIn = (reqCookies = null) => {
    if (reqCookies) {
        const parsedCookies = cookie.parse(reqCookies || '');
        return Boolean(parsedCookies.user_auth_token);
    }

    return Boolean(Cookies.get('user_auth_token'));
};

export const logIn = (navigate: NavigateFunction) => {

    Cookies.set('user_auth_token', 'true', {
        expires: 1, // 1 day
        sameSite: 'Lax',
    });
    navigate('/home');
};

export const logOut = async (navigate: NavigateFunction) => {
    api().post('/logout');
        Cookies.remove('user_auth_token');
        navigate('/login');
};