import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { GuestRoute, PrivateRoute } from '@/utils/AuthRouter';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
