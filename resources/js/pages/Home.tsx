'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

type LogItem = {
    id: number;
    log: string;
    created_at: string; // Added this!
};

export default function Home() {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<LogItem[] | null>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('http://evo-comms.test/api/logs', {
                    credentials: 'include',
                });
                const data: LogItem[] = await res.json();

                // Optional: Sort by most recent
                const sorted = data.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setLogs(sorted.slice(0, 20)); // Keep just the latest 20
            } catch (err) {
                console.error('Error fetching logs:', err);
                setLogs([]);
            }
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[80vh] p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Welcome Section */}
                <div className="flex flex-col justify-center items-center text-center space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Welcome to Evocomms</h1>
                        <p className="text-muted-foreground mt-2 max-w-md">
                            An API to help you navigate terminals connected to EvoTime.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Status:</span>
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">Connected</Badge>
                    </div>

                    <Button onClick={() => navigate('/terminals')}>View Customers</Button>
                </div>

                {/* Log Section */}
                <Card className="w-full">
                    <CardHeader className="border-b">
                        <CardTitle>Live Comms Log</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-80 overflow-auto">
                        <ul className="space-y-2 text-left text-sm">
                            {logs === null ? (
                                <li className="text-muted-foreground">Loading logs...</li>
                            ) : logs.length === 0 ? (
                                <li className="text-muted-foreground">No logs found.</li>
                            ) : (
                                logs.map((logItem) => (
                                    <li key={logItem.id} className="pb-1">
                                        <span className="text-muted-foreground block">
                                            {format(new Date(logItem.created_at), 'PPpp')}
                                        </span>
                                        <span>{logItem.log}</span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
