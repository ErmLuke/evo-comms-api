import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { isLoggedIn } from './utils/auth';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* If logged in, redirect /login to / */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn() ? <Navigate to="/" replace /> : <Login />
                    }
                />

                {/* If not logged in, redirect any route to /login */}
                <Route
                    path="/"
                    element={
                        isLoggedIn() ? <Home /> : <Navigate to="/login" replace />
                    }
                />

                {/* Catch-all redirect to login if route is unknown and not logged in */}
                <Route
                    path="*"
                    element={
                        isLoggedIn() ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
