'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Clocking } from '@/types/types';
import TerminalStatus from '../../components/terminal-dashboard/terminal-status';
import TerminalStatCards from '../../components/terminal-dashboard/terminal-stat-cards';
import RecentClockings from '../../components/terminal-dashboard/recent-clockings';
import CommsChart from '../../components/terminal-dashboard/comms-chart';
import RepollDialog from '../../components/terminal-dashboard/repoll-dialog';
import SkeletonLoader from '../../components/terminal-dashboard/skeleton-loader';

type Props = {
    terminalId: string;
};

export default function TerminalDashboard({ terminalId }: Props) {
    const [terminal, setTerminal] = useState<Terminal>();
    const [clockings, setClockings] = useState<Clocking[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        start_date: null as Date | null,
        end_date: null as Date | null,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [terminalRes, clockingRes] = await Promise.all([
                    fetch(`http://evo-comms.test/api/terminals/${terminalId}`, { credentials: 'include' }),
                    fetch(`http://evo-comms.test/api/terminals/${terminalId}/clockings`, { credentials: 'include' }),
                ]);
                const terminalData: {data : Terminal} = await terminalRes.json();
                const clockingData: Clocking[] = await clockingRes.json();
                console.log(terminalData);
                setTerminal(terminalData?.data);
                setClockings(Array.isArray(clockingData) ? clockingData : []);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [terminalId]);

    const handleRepollSubmit = async () => {
        if (!terminal || !formData.start_date || !formData.end_date) return;

        await fetch('/api/repoll-clockings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                terminal_id: terminal.id,
                start_date: formData.start_date.toISOString(),
                end_date: formData.end_date.toISOString(),
            }),
        });

        setOpen(false);
        setFormData({ start_date: null, end_date: null });
    };

    if (loading) return <SkeletonLoader />;

    return (
        <div className="p-6 space-y-6">
            <TerminalStatus terminal={terminal} />
            <TerminalStatCards terminal={terminal} clockings={clockings} />
            <RecentClockings clockings={clockings} onRepollClick={() => setOpen(true)} />
            <CommsChart clockings={clockings} />
            <RepollDialog
                open={open}
                setOpen={setOpen}
                terminal={terminal}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleRepollSubmit}
            />
        </div>
    );
}
