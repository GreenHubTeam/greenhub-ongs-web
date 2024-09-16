import { Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/dashboard"
import { AppPage } from "../pages/app"

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppPage />}>
                <Route path="/" element={<DashboardPage />} />
            </Route>
        </Routes>
    )
}