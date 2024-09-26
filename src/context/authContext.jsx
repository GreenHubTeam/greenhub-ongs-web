import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../libs/axios";
import { jwtDecode } from "jwt-decode";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    async function loginUser(email, password) {
        try {
            const resposta = await api.post('/login', {
                email: email,
                password: password
            });

            const decoded = jwtDecode(resposta.data.token);
            setUser(decoded);

            setToken(resposta.data.token);

            localStorage.setItem('@greenhubONG:token', resposta.data.token);

            toast.success("Login efetuado com sucesso, seja bem vindo!")
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Error interno no servidor");
            }
        }
    }

    async function registerUser(body) {
        const resposta = await api.post('/ong', body);

        setToken(resposta.data.token);
    }

    useEffect(() => {
        const token = localStorage.getItem('@greenhubONG:token');

        if (token) {
            setToken(token);
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, [])

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('@greenhubONG:token');
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loginUser,
                registerUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};