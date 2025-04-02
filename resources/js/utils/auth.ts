import cookie from 'cookie';
import Cookies from 'js-cookie'; // for server-side cookie parsing

export const isLoggedIn = (reqCookies = null) => {
    if (reqCookies) {
        const parsedCookies = cookie.parse(reqCookies || '');
        return Boolean(parsedCookies.user_auth_token);
    }

    return Boolean(Cookies.get('user_auth_token'));
};

export const logIn = () => {
    Cookies.set('user_auth_token', 'true', {
        expires: 1, // 1 day
        sameSite: 'Lax',
    });
};

export const logOut = () => {
    if (typeof window !== 'undefined') {
        Cookies.remove('user_auth_token');
    }
};
