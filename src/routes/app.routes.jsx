import { Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/dashboard"
import { AppPage } from "../pages/app"
import {EditarPost} from '../pages/editarpost'
import {PostPage} from '../pages/postpage'
import { Criacaopost } from "../pages/criacaopost"

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/editar" element={<EditarPost/>}/>
                <Route path="/post" element={<PostPage/>}/>
                <Route path="/criacao" element={<Criacaopost/>}/>
            </Route>
        </Routes>
    )
}