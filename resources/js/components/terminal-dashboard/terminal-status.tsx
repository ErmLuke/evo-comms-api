import React from 'react';
import { Terminal } from '@/types/types';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'online': return 'bg-green-500';
        case 'offline': return 'bg-red-500';
        case 'idle': return 'bg-yellow-500';
        default: return 'bg-gray-400';
    }
};

export default function TerminalStatus({ terminal }: { terminal?: Terminal }) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
                Terminal Dashboard : {terminal?.terminal_name ?? 'Unknown Name'}
            </h1>
            {terminal && (
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(terminal.status)}`} />
                    <span className="text-sm text-muted-foreground capitalize">{terminal.status}</span>
                </div>
            )}
        </div>
    );
}