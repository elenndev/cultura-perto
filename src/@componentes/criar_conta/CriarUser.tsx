'use client'
import { useState } from "react";
import axios from "axios";
import * as S from '@/styles/StyledLogin'
import Loader from "../Loader";


const url = process.env.NEXT_PUBLIC_APP_URL

interface criarContaProps {
    irParaOsDetalhes: (usuario: {username: string, email: string, password: string}) => void;
}
export default function CriarCUser(props : criarContaProps) {
    const [email, setEmail] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError(""); 
        const checarUsernameCaracteres = (username: string) =>{
            const regex = /^[a-zA-Z0-9]+$/
            return regex.test(username)
        }

        if(!checarUsernameCaracteres(username)){
            setError("O nome de usuário deve ter no mínimo 5 caracteres e não deve conter simbolos especiais como espaço em branco, @, #, ^, etc...")
            setLoading(false)
            return 
        }

        try{
            const reqChecarUsernameEmail = await axios.get(`${url}/api/user`, { params: { email, username } });

            if(reqChecarUsernameEmail.data.user && ['email indisponivel','username indisponivel','email e nome de usuario indisponivel'].includes(reqChecarUsernameEmail.data.user)){
                setLoading(false)
                return setError(reqChecarUsernameEmail.data.user as string)
            }
        }catch(error){
            console.log(error)
            setLoading(false)
            return setError("Erro na requisição para criar o usuário, se o erro persistir por favor entre em contato com o suporte")
        }

        if(password != confirmarSenha){
        return setError("Senhas diferentes, por favor verifique novamente")
        }
        props.irParaOsDetalhes({
            email,
            username,
            password,
        })


        };

        return(
            <div className="flex mt-10 mb-10 justify-center items-center">
        <div className="w-full max-w-sm p-3 shadow-xl rounded-3xl border border-[#ffb162]">
            <div className="w-full max-w-sm bg-[#222e3d] shadow-xl p-4 rounded-3xl">
                {loading ? (<div className='flex flex-col  items-center'>
                    <Loader size='3rem'></Loader>
                    <p>Aguarde um momento</p>
                </div>) : (<>
                    <h1 className="text-2xl font-bold text-center mb-6 text-white">Criar uma nova conta</h1>
                    
                    <S.Form onSubmit={handleSubmit}>
                        {error && <S.TextoErro><p>{error}</p></S.TextoErro>}

                        <S.FormInput>
                            <label htmlFor="username">
                                Nome de usuario
                            </label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                minLength={5}
                                value={username}
                                onChange={(e) => {setError("");setUsername(e.target.value)}}
                                required/>
                        </S.FormInput>

                        <S.FormInput>
                            <label htmlFor="email">
                            Email
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </S.FormInput>
                    
                    <S.FormInput>
                        <label htmlFor="password">
                        Senha
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        minLength={10}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </S.FormInput>

                    <S.FormInput>
                        <label htmlFor="confirmarSenha">
                        Confirmar senha
                        </label>
                        <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                        />
                    </S.FormInput>

                    <div className="mb-4 mt-2 flex w-full justify-center">
                        <S.Button_Principal
                        type="submit"
                        className='font-semibold rounded-md text-white'
                        >Criar Conta</S.Button_Principal>
                    </div>
                    </S.Form>

                    <div className="text-center mt-4">
                        <a href="/login"
                        className="font-semibold">Já tem uma conta? Faça login</a>
                    </div>
                </>)}

            </div>
        </div>
        </div>
    )
}
