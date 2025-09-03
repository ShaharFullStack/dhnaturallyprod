import React, { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../../../lib/i18b';
import { useLanguage } from '../../../Contexts/language-context';
import { useAuth } from '../../../Contexts/auth-context';
import './Admin.css';

export function AdminLogin(): JSX.Element {
    const { language } = useLanguage();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const success = await login(email, password);
            if (success) {
                navigate('/admin');
            } else {
                setError('Invalid credentials or insufficient permissions. Admin access required.');
            }
        } catch (err: any) {
            setError(err.message ?? 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login container">
            <h2>{t('admin.login.title', language) ?? 'Admin Login'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="admin-login-form">
                <label>
                    {t('admin.login.email', language) ?? 'Email'}
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    {t('admin.login.password', language) ?? 'Password'}
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit" disabled={loading}>{loading ? t('admin.login.loading', language) ?? 'Logging in...' : t('admin.login.submit', language) ?? 'Login'}</button>
            </form>
        </div>
    );
}

export default AdminLogin;
