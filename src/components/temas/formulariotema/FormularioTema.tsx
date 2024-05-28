/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";

function FormularioTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setLoading] = useState<boolean>(false);

    const {usuario, handleLogout} = useContext(AuthContext);

    const token = usuario.token;

    const {id} = useParams<{id: string}>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: token
                }
            })
        } catch (error: any) {
            if(error.toString().includes('401')){
                ToastAlerta('Token expirado!', 'info');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if(token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/login');
        }
    }, [token])

    useEffect(() => {
        if(id !== undefined) {
            buscarPorId(id)
        }
    }, [id])


    function stateActually(event: ChangeEvent<HTMLInputElement>) {
        setTema(
            {...tema,
            [event.target.name]: event.target.value
        });
    }

    function retornar(){
        navigate('/temas');
    }

    async function generationNewTheme(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                });
                ToastAlerta('Tema atualizado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    ToastAlerta('O token expirou!', 'info');
                    handleLogout();
                }
                ToastAlerta('Erro ao atualizar o tema!', 'erro');
            }
        }else{
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                });
                ToastAlerta('Tema cadastrado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    ToastAlerta('O token expirou!', 'info');
                    handleLogout();
                }
                ToastAlerta('Erro ao cadastrar o tema!', 'erro');
            }
        }

        setLoading(false);
        retornar();
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar tema' :  'Editar tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={generationNewTheme}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => stateActually(e)}
                    />
                </div>
                <button className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block justify-center" type="submit">
                    {
                        isLoading ? (
                            <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='24' visible={true}/>
                        ) : (
                            <span>{id === undefined ? 'Cadastrar' :  'Atualizar'}</span>
                        )
                    }
                </button>
            </form>
        </div>
    );
}

export default FormularioTema;