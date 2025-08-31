import { Navigate, Route, Routes } from "react-router-dom";
import { JSX } from "react";
import { Home } from "../../pages/Home/Home";
import { Store } from "../../pages/Store/Store";
import { Articles } from "../../pages/Articles/Articles";
import { About } from "../../pages/About/About";
import { Contact } from "../../pages/Contact/Contact";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}