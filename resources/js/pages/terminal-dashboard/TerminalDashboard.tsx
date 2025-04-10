'use client';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Terminal, Clocking } from '@/types/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type Props = {
    terminalId: string;
};

export default function TerminalDashboard({ terminalId }: Props) {
    const [terminal, setTerminal] = useState<Terminal | null>(null);
    const [clockings, setClockings] = useState<Clocking[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        start_date: null as Date | null,
        end_date: null as Date | null,
    });

    useEffect(() => {
        fetchData();
    }, [terminalId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [terminalRes, clockingRes] = await Promise.all([
                fetch(`http://evo-comms.test/api/terminals/${terminalId}`, { credentials: 'include' }),
                fetch(`http://evo-comms.test/api/terminals/${terminalId}/clockings`, { credentials: 'include' }),
            ]);

            const terminalData: Terminal = await terminalRes.json();
            const clockingData: Clocking[] = await clockingRes.json();

            setTerminal(terminalData);
            setClockings(clockingData);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online':
                return 'bg-green-500';
            case 'offline':
                return 'bg-red-500';
            case 'idle':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-400';
        }
    };

    const renderDatePicker = (
        label: string,
        value: Date | null,
        onChange: (date: Date | undefined) => void
    ) => (
        <div className="flex-1">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            !value && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, 'PPP') : 'Select date'}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value ?? undefined}
                        onSelect={onChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );

    const handleSubmit = async () => {
        if (!terminal || !formData.start_date || !formData.end_date) return;

        await fetch('/api/repoll-clockings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                terminal_id: terminal.id,
                start_date: formData.start_date.toISOString(),
                end_date: formData.end_date.toISOString(),
            }),
        });

        setOpen(false);
        setFormData({ start_date: null, end_date: null });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Terminal Dashboard</h1>
                {terminal && (
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${getStatusColor(terminal.status)}`} />
                        <span className="text-sm text-muted-foreground capitalize">{terminal.status}</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Last Clocking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clockings[0]?.timestamp ? format(new Date(clockings[0].timestamp), 'PPpp') : '—'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Created On</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{terminal?.created_at ? format(new Date(terminal.created_at), 'PPpp') : '—'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Clockings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clockings.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Recent Clockings</CardTitle>
                    <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
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

            <Card>
                <CardHeader>
                    <CardTitle>Comms Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={getChartData(clockings)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg">Repoll Clockings</DialogTitle>
                        {terminal && (
                            <div className="text-sm text-muted-foreground mt-1 space-y-1">
                                <div>
                                    <span className="font-medium text-foreground">Clock:</span>{' '}
                                    {terminal.name}
                                </div>
                                <div>
                                    <span className="font-medium text-foreground">Serial:</span>{' '}
                                    {terminal.serial_number}
                                </div>
                            </div>
                        )}
                    </DialogHeader>

                    <div className="flex gap-4 mt-4">
                        {renderDatePicker('Start Date', formData.start_date, (date) =>
                            setFormData((prev) => ({ ...prev, start_date: date ?? null }))
                        )}
                        {renderDatePicker('End Date', formData.end_date, (date) =>
                            setFormData((prev) => ({ ...prev, end_date: date ?? null }))
                        )}
                    </div>

                    <DialogFooter className="mt-4">
                        <Button onClick={handleSubmit}>Create Job</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Prepare chart data by grouping clockings per day
function getChartData(clockings: Clocking[]) {
    const dataMap: { [date: string]: number } = {};

    clockings.forEach((c) => {
        const date = format(new Date(c.timestamp), 'yyyy-MM-dd');
        dataMap[date] = (dataMap[date] || 0) + 1;
    });

    return Object.entries(dataMap).map(([date, count]) => ({ date, count }));
}
