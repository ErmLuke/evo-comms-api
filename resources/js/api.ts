import axios from 'axios';
import { logOut } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

export default function api() {
    const instance = axios.create({
        baseURL: 'http://evo-comms.test',
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                logOut(useNavigate());
                return Promise.reject();
            }
            return Promise.reject(error);
        }
    );

    return instance;
}
