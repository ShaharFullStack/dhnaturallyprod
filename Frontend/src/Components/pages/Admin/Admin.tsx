import React, { JSX } from 'react';
import { t } from '../../../lib/i18b';
import { useLanguage } from '../../../Contexts/language-context';

export function Admin(): JSX.Element {
    const { language } = useLanguage();
    return (
        <div className="admin-dashboard container">
            <h2>{t('admin.dashboard.title', language) ?? 'Admin Dashboard'}</h2>
            <p>{t('admin.dashboard.welcome', language) ?? 'Welcome to the admin area.'}</p>
        </div>
    );
}

export default Admin;
