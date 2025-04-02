import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import axios from 'axios';
import { columns } from './table-columns';


export default function TerminalTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://evo-comms.test/api/terminals')
            .then(response => setData(response.data))
            .catch(error => console.error('Failed to fetch terminals:', error));
    }, []);

    return (
        <DataTable columns={columns} data={data} />
    );
};
