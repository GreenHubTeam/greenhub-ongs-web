import { Outlet } from "react-router-dom";
import LayoutAppComponent from "../../components/layout";

export function AppPage() {
    return (
        <LayoutAppComponent>
            <Outlet />
        </LayoutAppComponent>
    )
}