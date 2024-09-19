import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { CadastroPage } from "../pages/cadastro";
import { DashboardPage } from "../pages/dashboard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function RoutesMain() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {<AuthRoutes/>}
        </BrowserRouter>
    )
}