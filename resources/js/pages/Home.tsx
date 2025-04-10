'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Clocking } from '@/types/types';
import { format } from 'date-fns';

export default function Home() {
    const navigate = useNavigate();
    const [log, setLog] = useState<Clocking[]>([]);

    useEffect(() => {
        const fetchLog = async () => {
            try {
                const res = await fetch('http://evo-comms.test/api/clockings', {
                    credentials: 'include',
                });
                const data: Clocking[] = await res.json();
                setLog(data.slice(0, 20));
            } catch (err) {
                console.error('Error fetching clockings:', err);
            }
        };

        fetchLog();
        const interval = setInterval(fetchLog, 5000);

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
                            {log.length ? (
                                log.map((clocking) => (
                                    <li key={clocking.id} className="flex justify-between border-b pb-1">
                                        <span className="text-muted-foreground">
                                            {format(new Date(clocking.timestamp), 'PPpp')}
                                        </span>
                                        <Badge variant="secondary">{clocking.event_type}</Badge>
                                    </li>
                                ))
                            ) : (
                                <li className="text-muted-foreground">No activity yet.</li>
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
