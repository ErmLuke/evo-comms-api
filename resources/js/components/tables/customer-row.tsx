import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, Customer } from '@/types/types';
import { TerminalTable } from './terminal-table';

interface Props {
    customer: Customer;
    terminals: Terminal[];
    isOpen: boolean;
    onToggle: () => void;
}

export function CustomerRow({ customer, terminals, isOpen, onToggle }: Props) {
    return (
        <>
            <tr onClick={onToggle} className="cursor-pointer hover:bg-gray-50">
                <td className="w-1/3 border p-2 font-medium">{customer.customer_name}</td>
                <td className="w-1/3 border p-2">{customer.evotime_id}</td>
                <td className="w-1/3 border p-2">{customer.evotime_domain}</td>
            </tr>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <tr>
                        <td colSpan={3} className="p-0 bg-muted">
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <TerminalTable terminals={terminals} />
                            </motion.div>
                        </td>
                    </tr>
                )}
            </AnimatePresence>
        </>
    );
}
