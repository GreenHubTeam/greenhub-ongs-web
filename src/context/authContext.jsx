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

    async function createPost(postData, ongId, imageFile) {
        const formData = new FormData();
    
        for (const key in postData) {
            formData.append(key, postData[key]);
        }
    
        if (imageFile) {
            formData.append('project-image', imageFile); 
        }
        const response = await api.post(`/project/create/${ongId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  
            },
        });
    
    }
    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                loginUser,
                registerUser,
                createPost
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}