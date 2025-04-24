import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SkeletonLoader() {
    return (
        <div className="p-6 space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="h-6 w-1/2 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader><CardTitle className="h-4 w-32 bg-muted rounded" /></CardHeader>
                        <CardContent><div className="h-6 w-3/4 bg-muted rounded" /></CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="h-4 w-40 bg-muted rounded" />
                    <div className="h-8 w-24 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                    <ul className="divide-y text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <li key={i} className="py-2 flex justify-between items-center">
                                <div className="h-4 w-1/3 bg-muted rounded" />
                                <div className="h-6 w-16 bg-muted rounded" />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="h-4 w-40 bg-muted rounded" /></CardHeader>
                <CardContent><div className="h-72 w-full bg-muted rounded" /></CardContent>
            </Card>
        </div>
    );
}
