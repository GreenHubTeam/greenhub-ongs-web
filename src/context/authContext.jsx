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

    async function OngUser(data) {
        const resposta = await api.post('/registro',data);

        setToken(resposta.data.token);
        setUser(resposta.data.user);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loginUser,
                OngUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}