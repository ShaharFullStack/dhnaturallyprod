import { Navigate, Route, Routes } from "react-router-dom";
import { JSX } from "react";
import { Home } from "../../pages/Home/Home";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}