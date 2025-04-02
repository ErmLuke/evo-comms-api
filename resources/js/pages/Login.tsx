import { useState } from 'react';
import axios from 'axios';
import api from '@/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logIn } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

const Login = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withXSRFToken = true;

    const login = async () => {
        try {
            setError('');

            // Get CSRF token
            await api().get('/sanctum/csrf-cookie');

            // Attempt login
            const response = await api().post('/login', { email, password });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                logIn();
                navigate('/');
                setUser(response.data.user || { email });
                console.log('Logged in Successfully');
            }

        } catch (err: any) {
            console.error('Login failed:', err);

            if (err.response?.status === 401) {
                setError('Invalid email or password.');
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-muted">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <Button className="w-full" onClick={login}>
                        Login
                    </Button>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
