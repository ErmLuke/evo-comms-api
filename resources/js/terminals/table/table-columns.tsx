import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Terminal Name",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            const statusColorMap: Record<string, string> = {
                connected: "text-green-600",
                disconnected: "text-yellow-600",
                orphaned: "text-red-600",
                unknown: "text-gray-500",
            };

            return (
                <span className={`font-medium ${statusColorMap[status] ?? "text-gray-400"}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
            );
        },
    },
    {
        accessorKey: "last_connection",
        header: "Last Connected",
        cell: ({ row }) => {
            const date = row.original.last_connection;
            if (!date) return <span className="text-gray-400 italic">Never</span>;

            const formatted = new Date(date).toLocaleString(); // You can format it better if needed
            return <span>{formatted}</span>;
        },
    },
];
