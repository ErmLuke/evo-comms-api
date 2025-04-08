import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '@/utils/auth';

export const PrivateRoute = () =>{

    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};
export const GuestRoute = () => {

    return !isLoggedIn() ? <Outlet /> : <Navigate to="/home" />;
};

