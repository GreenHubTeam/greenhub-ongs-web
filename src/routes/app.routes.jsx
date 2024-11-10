import { VisualizarProjetos } from '../pages/visualizarprojetos';
import { EditarProjetos } from '../pages/editarprojetos';
import { CriarProjetos } from "../pages/criarprojetos";
import { DashboardPage } from "../pages/dashboard";
import { PostPage } from "../pages/posts";
import { ProjetosPage } from '../pages/projetos';
import { Route, Routes } from "react-router-dom";
import { PerfilPage } from '../pages/perfil';
import { AppPage } from "../pages/app";
import { NotFoundPage } from '../pages/notfound';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="/posts" element={<PostPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjetosPage />} />
                <Route path="/edit-project/:id" element={<EditarProjetos />} />
                <Route path="/show-project/:id" element={<VisualizarProjetos />} />
                <Route path="/create-project" element={<CriarProjetos />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/" element={<DashboardPage />} />
            </Route>
            <Route path="*" element={< NotFoundPage />} />
        </Routes>
    )
}