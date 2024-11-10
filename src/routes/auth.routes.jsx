import { LoginPage } from "../pages/login";
import { Route, Routes } from "react-router-dom";
import { CadastroPage } from "../pages/cadastro";
import { NotFoundPage } from "../pages/notfound";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path='/registro' element={<CadastroPage />} />
            <Route path="*" element={< NotFoundPage />} />
        </Routes>
    )
}