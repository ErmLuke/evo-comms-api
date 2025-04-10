'use client';

import React, { useState } from 'react';
import { Terminal } from '@/types/types';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
} from '@/components/ui/context-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useNavigate } from 'react-router-dom';

interface Props {
    terminals: Terminal[];
}

export function TerminalTable({ terminals }: Props) {
    const navigate = useNavigate();
    const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        start_date: null as Date | null,
        end_date: null as Date | null,
    });

    const handleOpenModal = (terminal: Terminal) => {
        setSelectedTerminal(terminal);
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!selectedTerminal || !formData.start_date || !formData.end_date) return;

        await fetch('/api/repoll-clockings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                terminal_id: selectedTerminal.id,
                start_date: formData.start_date.toISOString(),
                end_date: formData.end_date.toISOString(),
            }),
        });

        setOpen(false);
        setFormData({ start_date: null, end_date: null });
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

    return (
        <>
            <table className="w-full table-fixed">
                <tbody>
                {terminals.length > 0 ? (
                    terminals.map((terminal) => (
                        <ContextMenu key={`${terminal.id}-${terminal.name}`}>
                            <ContextMenuTrigger asChild>
                                <tr
                                    onClick={() => navigate(`/terminals/${terminal.id}`)}
                                    className="cursor-pointer hover:bg-gray-50"
                                >
                                    <td className="w-1/3 p-2 text-sm">{terminal.name}</td>
                                    <td className="w-1/3 p-2 text-sm">{terminal.serial_number}</td>
                                    <td className="w-1/3 p-2 text-sm">{terminal.model}</td>
                                </tr>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem onClick={() => handleOpenModal(terminal)}>
                                    Re-poll clockings
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    ))
                ) : (
                    <tr>
                        <td className="p-2 text-sm italic text-gray-500" colSpan={3}>
                            No terminals assigned
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg">Repoll Clockings</DialogTitle>
                        {selectedTerminal && (
                            <div className="text-sm text-muted-foreground mt-1 space-y-1">
                                <div>
                                    <span className="font-medium text-foreground">Clock:</span>{' '}
                                    {selectedTerminal.name}
                                </div>
                                <div>
                                    <span className="font-medium text-foreground">Serial:</span>{' '}
                                    {selectedTerminal.serial_number}
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
        </>
    );
}
