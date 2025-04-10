import { useParams } from 'react-router-dom';
import TerminalDashboard from './TerminalDashboard';

export default function TerminalDashboardWrapper() {
    const { terminalId } = useParams<{ terminalId: string }>();

    if (!terminalId) {
        return <div>Missing terminal ID</div>;
    }

    return <TerminalDashboard terminalId={terminalId} />;
}