import React, { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../../../lib/i18b';
import { useLanguage } from '../../../Contexts/language-context';
import './Admin.css';

export function AdminLogin(): JSX.Element {
    const { language } = useLanguage();
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
            const res = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const contentType = res.headers.get('content-type') || '';
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Login failed: ${res.status}`);
            }
            if (!contentType.includes('application/json')) {
                const text = await res.text();
                throw new Error(`Unexpected response: ${text}`);
            }
            const data = await res.json();
            // Expect { token, user }
            if (data.token) {
                localStorage.setItem('dhn_token', data.token);
                // Optionally save user info
                localStorage.setItem('dhn_user', JSON.stringify(data.user || {}));
                navigate('/admin');
            } else {
                throw new Error('No token in response');
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
