import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Terminal, Settings } from 'lucide-react';

const SideNavigation = ({ children }: { children: JSX.Element }) => {
    return (
        <aside className="w-64 h-screen bg-white border-r shadow-sm p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <LayoutDashboard className="text-blue-500" />
                <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <nav className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2">
                    <Terminal className="w-4 h-4" />
                    Terminals
                </Button>
                <Button variant="ghost" className="justify-start gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                </Button>
                {/* Add more nav links here */}
            </nav>
        </aside>
    );
};

export default SideNavigation;
