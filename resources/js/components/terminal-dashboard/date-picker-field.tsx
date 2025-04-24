import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function DatePickerField({ label, value, onChange }: {
    label: string,
    value: Date | null,
    onChange: (date: Date | undefined) => void
}) {
    return (
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
}
