import { createContext, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/service";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading(): boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({children}: AuthProviderProps){
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin){
        setIsLoading(true);
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario);
            alert("Usuário autenticado com sucesso!");
            setIsLoading(false);
        } catch (error) {
            alert("Dados do usuário, incosistentes!");
            setIsLoading(false);
        }
    }

    function handleLogout(){
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        });
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            handleLogout,
            handleLogin,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}