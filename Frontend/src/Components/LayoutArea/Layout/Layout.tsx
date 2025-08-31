import React, { JSX } from 'react';
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
                <Header />
            <main className="layout-main">
                <div className="main-content-wrapper">
                    <Routing />
                </div>
            </main>
            <footer className="layout-footer">
                <Footer />
            </footer>
        </div>
    );
}