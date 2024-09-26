import { useContext } from "react";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export function RoutesMain() {
    const { token } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {token ? <AppRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    )
}