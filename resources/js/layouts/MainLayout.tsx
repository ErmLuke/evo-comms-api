import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Outlet } from 'react-router-dom';
import { logOut } from '@/utils/auth';
import { UserType } from '@/types/types';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://evo-comms.test/api/user', {
                    withCredentials: true
                });
                setUser(res.data);
            } catch (err) {
                console.log(err);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const generateBreadcrumbs = () => {
        if (location.pathname === '/home') return null;

        const segments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = segments.map((seg, idx) => {
            const path = '/' + segments.slice(0, idx + 1).join('/');
            return {
                name: decodeURIComponent(seg).replace(/-/g, ' '),
                path
            };
        });

        return (
            <nav className="text-sm text-muted-foreground mb-6">
                <Link to="/" className="text-primary hover:underline">Home</Link>
                {breadcrumbs.map((crumb, i) => (
                    <span key={i}>
                    {' / '}
                        <Link to={crumb.path} className="text-primary hover:underline capitalize">
                        {crumb.name}
                    </Link>
                </span>
                ))}
            </nav>
        );
    };


    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 shadow-sm border-b">
                <div>
                    <h1 className="text-xl text-slate-700 font-bold tracking-tight">Evocomms</h1>
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                <div className="text-sm font-medium">{user?.name}</div>
                                <div className="text-xs text-muted-foreground">{user?.email}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => logOut(navigate)}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="p-6">
                {generateBreadcrumbs()}
                <Outlet />
            </main>
        </div>
    );
}
