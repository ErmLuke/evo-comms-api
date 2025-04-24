import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Clocking } from '@/types/types';
import { format } from 'date-fns';

export default function TerminalStatCards({ terminal, clockings }: { terminal?: Terminal; clockings: Clocking[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader><CardTitle>Last Clocking</CardTitle></CardHeader>
                <CardContent>
                    <p>{clockings[0]?.timestamp ? format(new Date(clockings[0].timestamp), 'PPpp') : '—'}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Created On</CardTitle></CardHeader>
                <CardContent>
                    <p>{terminal?.created_at ? format(new Date(terminal.created_at), 'PPpp') : '—'}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Total Clockings</CardTitle></CardHeader>
                <CardContent>
                    <p>{clockings.length}</p>
                </CardContent>
            </Card>
        </div>
    );
}