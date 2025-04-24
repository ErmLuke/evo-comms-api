import React, { useState, useEffect } from 'react';
import { CustomerRow } from './customer-row';
import { Terminal, Customer } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CustomerTable() {
    const [openCustomerId, setOpenCustomerId] = useState<string | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [terminals, setTerminals] = useState<Terminal[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Customer, direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchCustomers();
        fetchTerminals();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://evo-comms.test/api/customers', {
                credentials: 'include',
            });
            const data: Customer[] = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchTerminals = async () => {
        try {
            const response = await fetch('http://evo-comms.test/api/terminals', {
                credentials: 'include',
            });
            const data: Terminal[] = await response.json();
            setTerminals(data);
        } catch (error) {
            console.error('Error fetching terminals:', error);
        }
    };

    const handleSort = (key: keyof Customer) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const renderHeader = (label: string, key: keyof Customer) => (
        <th
            className="w-1/3 border p-2 text-left cursor-pointer select-none"
            onClick={() => handleSort(key)}
        >
            {label}
            {sortConfig?.key === key ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
        </th>
    );

    const allCustomers = [
        ...customers,
        { id: 'unassigned', customer_name: 'Unassigned Terminals', evotime_id: '', evotime_domain: '' }
    ];

    const filteredCustomers = [...allCustomers]
        .filter((customer) =>
            customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (!sortConfig) return a.customer_name.localeCompare(b.customer_name);

            const { key, direction } = sortConfig;
            const valA = a[key] || '';
            const valB = b[key] || '';
            const result = valA.toString().localeCompare(valB.toString(), undefined, { numeric: true });
            return direction === 'asc' ? result : -result;
        });

    const totalItems = filteredCustomers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <Button variant="outline">Add Terminal</Button>
                </div>

                <Input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset page on search
                    }}
                    className="w-64"
                />
            </div>

            <div className="max-h-[calc(100vh-500px)] overflow-auto border border-gray-300 rounded">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-100">
                    <tr>
                        {renderHeader('Name', 'customer_name')}
                        {renderHeader('ID', 'evotime_id')}
                        {renderHeader('Domain', 'evotime_domain')}
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedCustomers.map((customer) => {
                        const relatedTerminals = terminals.filter(term =>
                            customer.id === 'unassigned'
                                ? !customers.some(c => c.id === term.customer_id)
                                : term.customer_id === customer.id
                        );

                        if (!relatedTerminals.length && customer.id === 'unassigned') return null;

                        return (
                            <CustomerRow
                                key={customer.id}
                                customer={customer}
                                terminals={relatedTerminals}
                                isOpen={openCustomerId === customer.id}
                                onToggle={() =>
                                    setOpenCustomerId(openCustomerId === customer.id ? null : customer.id)
                                }
                            />
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-sm">
                <div>
                    Showing{' '}
                    <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, totalItems)}
                    </span>{' '}
                    of <span className="font-medium">{totalItems}</span> customers
                </div>

                <div className="flex items-center gap-4">
                    <select
                        className="border rounded px-2 py-1 text-sm"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page
                        }}
                    >
                        {[10, 25, 50, 100].map((num) => (
                            <option key={num} value={num}>
                                {num} per page
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
