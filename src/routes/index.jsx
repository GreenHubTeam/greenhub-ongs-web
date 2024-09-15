import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login";
import { CadastroPage } from "../pages/cadastro";
import { DashboardPage } from "../pages/dashboard";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function RoutesMain() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                {token ? (
                    <>
                        <Route path="/" element={<DashboardPage />} />
                    </>
                ) : (
                    <>
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/registro' element={<CadastroPage />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}