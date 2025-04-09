import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { GuestRoute, PrivateRoute } from '@/utils/AuthRouter';
import MainLayout from './layouts/MainLayout';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout/>}>
                    <Route path="/home" element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
