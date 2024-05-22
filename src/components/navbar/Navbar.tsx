import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {

    const navigate = useNavigate();

    const { handleLogout} = useContext(AuthContext);



    const logout = () => {
        handleLogout();
        alert('O usuário foi desconectado com sucesso!');
        navigate('/login');
    }

    return (
        <>
            <div className='w-full flex justify-center p-7
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg">
                    <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/login' className='hover:underline'>Login</Link>
                        <Link to='/home' className='hover:underline'>Home</Link>
                        <div className='hover:underline'>Postagens</div>
                        <Link to="/temas" className='hover:underline'>Temas</Link>
                        <Link to="/cadastrotema" className='hover:underline'>Cadastrar tema</Link>
                        <div className='hover:underline'>Perfil</div>
                        <Link to="" onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}