import React, { JSX, useEffect } from 'react';
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import { useLocation } from 'react-router-dom';
import "./Layout.css";

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, [pathname]);

    return null;
};

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <div className='layout-header'>
                <Header />
            </div>
            <main className="layout-main">
                <div className="main-content-wrapper">
                    <ScrollToTop />
                    <Routing />
                </div>
            </main>
            <footer className="layout-footer">
                <Footer />
            </footer>
        </div>
    );
}