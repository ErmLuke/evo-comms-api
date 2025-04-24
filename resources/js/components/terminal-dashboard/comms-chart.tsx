import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clocking } from '@/types/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function CommsChart({ clockings }: { clockings: Clocking[] }) {
    const dataMap: { [date: string]: number } = {};
    clockings.forEach((c) => {
        const date = format(new Date(c.timestamp), 'yyyy-MM-dd');
        dataMap[date] = (dataMap[date] || 0) + 1;
    });
    const data = Object.entries(dataMap).map(([date, count]) => ({ date, count }));

    return (
        <Card>
            <CardHeader><CardTitle>Comms Activity</CardTitle></CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}