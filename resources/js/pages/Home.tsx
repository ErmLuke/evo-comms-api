import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TerminalTable from '@/terminals/table/terminal-table'
import { Button } from '@/components/ui/button';
import { logOut } from '@/utils/auth'
import { useNavigate } from 'react-router-dom';
import api from '@/api';


export default function Home() {
    const navigate = useNavigate();

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
            <Button className="w-full m-20" onClick={()=> logOut(navigate)}>
                Log Out
            </Button>
        </main>
      </div>
  );
};
