import React, { useEffect, useState, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }: { children: ReactElement }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
                const res = await fetch('/api/user', { credentials: 'include' });

                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;
