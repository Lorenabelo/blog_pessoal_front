import { ChangeEvent, useEffect, useState } from 'react'
import Usuario from '../../models/Usuario'
import './Cadastro.css'
import { cadastrarUsuario } from '../../services/service';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../utils/ToastAlert';

export default function Cadastro() {

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate('/login');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUsuario({...usuario, [name]: value })
  }

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha === confirmPassword && usuario.senha.length >= 8) {

      setLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso');
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário', 'erro');
      }

    }else{
      ToastAlerta('Dados incosistentes! Verifique os dados do usuário.', 'erro');
      setUsuario({...usuario, senha: ''});
      setConfirmPassword('');
    }
    setLoading(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={handleSubmit}>
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
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
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPassword(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={retornar}>
              Cancelar
            </button>
            <button className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center' type='submit'>
            {
              isLoading ? (
                <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='24' visible={true}/>
              ) : (
                <span>Cadastrar</span>
              )
            }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}