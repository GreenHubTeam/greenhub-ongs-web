import { LoginPage } from "../pages/login";
import { Route, Routes } from "react-router-dom";
import { CadastroPage } from "../pages/cadastro";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/registro' element={<CadastroPage />} />
        </Routes>
    )
}