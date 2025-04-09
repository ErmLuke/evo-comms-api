import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const customers = [
    { id: 'tenant_21937619', name: 'Clocking Systems', domain: 'clockingsystems.evotime.com' },
    { id: 'tenant_21sda7619', name: 'Honey badger Interactive', domain: 'honeybadger.evotime.com' },
    { id: 'tenant_2193udhf19', name: 'Evotime', domain: 'demo.evotime.com' },
];

const terminals = [
    { id: 'AYIS109713', name: 'Front office', customer_id: 'tenant_21937619' },
    { id: 'AYIS109713', name: 'Back Office', customer_id: 'tenant_21937619' },
    { id: 'AYIS109713', name: 'Terminal C', customer_id: 'tenant_21sda7619' },
    { id: 'AYIS109713', name: 'Terminal D', customer_id: 'tenant_2193udhf19' },
    { id: 'AYIS109713', name: 'Terminal E', customer_id: 'tenant_2193udhf19' },
];

export default function CustomerTable() {
    const [openCustomerId, setOpenCustomerId] = useState<string | null>(null);

    const handleRowClick = (id: string) => {
        setOpenCustomerId(openCustomerId === id ? null : id);
    };

    return (
        <table className="min-w-full table-fixed border border-gray-300">
            <thead className="bg-gray-100">
            <tr>
                <th className="w-1/3 border p-2 text-left">Name</th>
                <th className="w-1/3 border p-2 text-left">ID</th>
                <th className="w-1/3 border p-2 text-left">Domain</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => {
                const relatedTerminals = terminals.filter(
                    (term) => term.customer_id === customer.id
                );

                return (
                    <React.Fragment key={customer.id}>
                        <tr
                            onClick={() => handleRowClick(customer.id)}
                            className="cursor-pointer hover:bg-gray-50"
                        >
                            <td className="w-1/3 border p-2">{customer.name}</td>
                            <td className="w-1/3 border p-2">{customer.id}</td>
                            <td className="w-1/3 border p-2">{customer.domain}</td>
                        </tr>

                        <AnimatePresence initial={false}>
                            {openCustomerId === customer.id && (
                                <tr>
                                    <td colSpan={3} className="p-0 bg-muted">
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <table className="w-full table-fixed">
                                                <tbody>
                                                {relatedTerminals.map((terminal) => (
                                                    <tr key={terminal.id}>
                                                        <td className="w-1/3 p-2 text-sm">{terminal.name}</td>
                                                        <td className="w-1/3 p-2 text-sm">{terminal.id}</td>
                                                        <td className="w-1/3 p-2 text-sm">{customer.domain}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </motion.div>
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </React.Fragment>
                );
            })}
            </tbody>
        </table>
    );
}
