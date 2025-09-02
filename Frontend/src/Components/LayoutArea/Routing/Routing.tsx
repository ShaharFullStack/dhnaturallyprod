import { Navigate, Route, Routes } from "react-router-dom";
import { JSX } from "react";
import { Home } from "../../pages/Home/Home";
import { Store } from "../../pages/Store/Store";
import { ProductDetail } from "../../pages/ProductDetail/ProductDetail";
import { Articles } from "../../pages/Articles/Articles";
import { ArticleDetail } from "../../pages/Articles/ArticleDetail";
import { About } from "../../pages/About/About";
import { AdminLogin } from "../../pages/Admin/AdminLogin";
import { Admin } from "../../pages/Admin/Admin";
import { Contact } from "../../pages/Contact/Contact";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}