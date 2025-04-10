import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CustomerTable from '@/components/tables/customer-table'


export default function Customers() {

    return (
    <div>
        <main className="m-10">
            <div className="mb-6 flex justify-center">
                <h1 className="text-4xl text-slate-700 font-bold tracking-tight">Evotime Customers</h1>
            </div>
            <Card>
                <CardContent>
                    <CustomerTable/>
                </CardContent>
            </Card>
        </main>
      </div>
  );
};
