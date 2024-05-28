import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout} = useContext(AuthContext);



    const logout = () => {
        handleLogout();
        ToastAlerta('O usuário foi desconectado com sucesso!', 'sucesso');
        navigate('/login');
    }

    return (
        <>
            <div className='w-full flex justify-center p-7
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                    <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        {
                            usuario.token && (
                                <div className='flex gap-4'>
                                    <Link to='/home' className='hover:underline'>Home</Link>
                                    <Link to='/postagens' className='hover:underline'>Postagens</Link>
                                    <Link to="/temas" className='hover:underline'>Temas</Link>
                                    <Link to="/cadastrotema" className='hover:underline'>Cadastrar tema</Link>
                                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                                    <Link to="" onClick={logout} className='hover:underline'>Sair</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}