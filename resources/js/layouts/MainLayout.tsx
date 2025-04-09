import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Outlet, useNavigate } from 'react-router-dom';
import { logOut } from '@/utils/auth';

export default function Layout() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 shadow-sm border-b">
                <div>

                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=> logOut(navigate)}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
