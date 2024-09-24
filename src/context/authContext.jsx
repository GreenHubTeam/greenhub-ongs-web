import { createContext, useState } from "react";
import { api } from "../libs/axios";


export const AuthContext = createContext({});

export function AuthPai({ children }) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    async function loginUser(email, password) {
        const resposta = await api.post('/login', {
            email: email,
            password: password
        });

        setToken(resposta.data.token);
        setUser(resposta.data.user);
    }

    async function registerUser(body) {
        const resposta = await api.post('/ong', body);
            
        setToken(resposta.data.token);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loginUser,
                registerUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}