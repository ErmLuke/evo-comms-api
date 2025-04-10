export interface Customer {
    id: string;
    customer_name: string;
    evotime_id: string;
    evotime_domain: string;
}

export type Terminal = {
    id: string;
    name: string;
    customer_id: string;
    serial_number: string;
    model: number;
    status: 'online' | 'offline' | 'idle' | string;
    created_at: string;
};

export type Clocking = {
    id: string;
    timestamp: string;
    event_type: 'in' | 'out' | 'break' | string;
};

export interface UserType {
    name: string;
    email: string;
}