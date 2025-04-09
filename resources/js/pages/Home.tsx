import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TerminalTable from '@/terminals/table/terminal-table'


export default function Home() {

  return (
    <div>
        <main>
            <Card className="m-30">
                <CardHeader>
                </CardHeader>
                <CardContent>
                    <TerminalTable/>
                </CardContent>
            </Card>
        </main>
      </div>
  );
};
