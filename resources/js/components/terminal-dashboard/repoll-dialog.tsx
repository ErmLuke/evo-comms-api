import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Terminal } from '@/types/types';
import DatePickerField from './date-picker-field';

export default function RepollDialog({
                                         open, setOpen, terminal, formData, setFormData, onSubmit
                                     }: {
    open: boolean,
    setOpen: (value: boolean) => void,
    terminal?: Terminal,
    formData: { start_date: Date | null; end_date: Date | null },
    setFormData: React.Dispatch<React.SetStateAction<{ start_date: Date | null; end_date: Date | null }>>,
    onSubmit: () => void
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Repoll Clockings</DialogTitle>
                    {terminal && (
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                            <div><span className="font-medium text-foreground">Clock:</span> {terminal.terminal_name}</div>
                            <div><span className="font-medium text-foreground">Serial:</span> {terminal.serial_number}</div>
                        </div>
                    )}
                </DialogHeader>

                <div className="flex gap-4 mt-4">
                    <DatePickerField
                        label="Start Date"
                        value={formData.start_date}
                        onChange={(date) => setFormData((prev) => ({ ...prev, start_date: date ?? null }))}
                    />
                    <DatePickerField
                        label="End Date"
                        value={formData.end_date}
                        onChange={(date) => setFormData((prev) => ({ ...prev, end_date: date ?? null }))}
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button onClick={onSubmit}>Create Job</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}