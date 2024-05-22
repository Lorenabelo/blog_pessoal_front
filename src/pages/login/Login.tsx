import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {

  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading} = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  )

  useEffect(() => {
    if (usuario.token !== '') {
      navigate("/home");
    }
  }, [usuario]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUsuarioLogin({...usuarioLogin, [name]: value })
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleLogin(usuarioLogin)
  }
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={handleSubmit}>
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <button  type='submit' className="rounded bg-indigo-400 hover:bg-indigo-900 text-white w-1/2 py-2 flex justify-center">
            {
              isLoading? (
                <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='24' visible={true}/>
              ) : (
                <span>Entrar</span>
              )
            }
          </button>

          <hr className="border-slate-800 w-full" />

          <Link to="/" className='hover:underline'>Ainda não tem uma conta?</Link>
        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;