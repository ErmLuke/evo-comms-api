import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clocking } from '@/types/types';
import { format } from 'date-fns';

export default function RecentClockings({ clockings, onRepollClick }: { clockings: Clocking[], onRepollClick: () => void }) {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Recent Clockings</CardTitle>
                <Button size="sm" variant="outline" onClick={onRepollClick}>
                    Re-poll Clockings
                </Button>
            </CardHeader>
            <CardContent>
                <ul className="divide-y text-sm">
                    {clockings.slice(0, 10).map((clock, idx) => (
                        <li key={idx} className="py-2 flex justify-between">
                            <span>{format(new Date(clock.timestamp), 'PPpp')}</span>
                            <Badge variant="secondary">{clock.event_type}</Badge>
                        </li>
                    ))}
                    {!clockings.length && <li className="py-2 text-muted-foreground">No clockings found.</li>}
                </ul>
            </CardContent>
        </Card>
    );
}