import { Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/dashboard"
import { AppPage } from "../pages/app"
import {EditarPost} from '../pages/editarpost'
import {PostPage} from '../pages/postpage'
import {PerfilPage} from '../pages/perfil'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/editar" element={<EditarPost/>}/>
                <Route path="/post" element={<PostPage/>}/>
                <Route path="/perfil" element={<PerfilPage/>}/>
            </Route>
        </Routes>
    )
}