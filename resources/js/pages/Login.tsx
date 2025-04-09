import { useState } from 'react';
import axios from 'axios';
import api from '@/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logIn } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

axios.defaults.withCredentials = true;

const Login = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password');
    const [showPassword, setShowPassword] = useState(false);
    const [user,setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withXSRFToken = true;

    const login = async () => {
        try {
            setError('');
            await api().get('/sanctum/csrf-cookie');
            const response = await api().post('/login', { email, password });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                logIn(navigate);
                setUser(response.data.user || { email });
                setMessage('Logged in successfully.');
            }
        } catch (err: any) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const messages = Object.values(errors).flat().join(' ');
                setError(messages);
                return;
            }
            if (err.response?.status === 401) {
                setError('Invalid email or password.');
                return;
            }
            setError('Unknown issue, contact developer.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted space-y-6">
            <h1 className="text-4xl font-bold text-primary">Evo Comms</h1>
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
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-primary"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <Button className="w-full" onClick={login}>
                        Login
                    </Button>
                    {message && <p className="text-sm text-blue-500">{message}</p>}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
