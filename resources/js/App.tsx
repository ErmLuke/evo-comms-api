import {
    BrowserRouter,
    Routes,
    Route, Navigate
} from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import { GuestRoute, PrivateRoute } from '@/utils/AuthRouter';
import MainLayout from './layouts/MainLayout';
import TerminalDashboardWrapper from '@/pages/terminal-dashboard/TerminalDashboardWrapper';
import Home from './pages/Home';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout/>}>
                        <Route path="/home" element={<Home /> } />
                        <Route path="/terminals" element={<Customers />} />
                        <Route path="/terminals/:terminalId" element={<TerminalDashboardWrapper />} />
                    </Route>
                </Route>
                <Route path="/*" element={<Navigate to="/login" replace />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
