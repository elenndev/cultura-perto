'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../Header";
import * as S from '@/styles/StyledLogin'
import Loader from "../Loader";

export default function Login() {
    const [emailOuUsername, setEmailOuUsername] = useState("")
    const router = useRouter()
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("") 

        const response = await signIn("credentials", {
            redirect: false,
            callbackUrl: '/',
            password,
            credential: emailOuUsername })

        if (response?.error || response?.status != 200) {
        setError(response?.error ?? "Erro ");
        setLoading(false)
        }else {
            router.push('/')
        }
        }

        return(
                <div className="h-full w-full flex flex-col items-center relative">
                    <Header username={null}/>
                    <div className='mt-14 w-full max-w-sm p-3 shadow-xl rounded-3xl border border-[#ffb162]'>
                        <div className="w-full max-w-sm bg-[#222e3d] shadow-xl p-4 rounded-3xl">
                            {loading ? (<div className='flex flex-col  items-center'>
                                                <Loader size='3rem'></Loader>
                                                <p>Aguarde um momento</p>
                                            </div>) : (<>
                            <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
                            
                            <S.Form onSubmit={handleSubmit}>
                                <S.FormInput>
                                    <label htmlFor="crendential">
                                    Email ou nome de usuário
                                    </label>
                                    <input
                                    type="text"
                                    id="crendential"
                                    name="crendential"
                                    value={emailOuUsername}
                                    onChange={(e) => setEmailOuUsername(e.target.value)}
                                    required
                                    />
                                </S.FormInput>
                                
                                <S.FormInput>
                                    <label htmlFor="password" >
                                    Senha
                                    </label>
                                    <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                </S.FormInput>

                                {error && <S.TextoErro><p>{error}</p></S.TextoErro>}

                                <div className="mb-4 mt-2 flex w-full justify-center">
                                    <S.Button_Principal
                                    type="submit"
                                    className='font-semibold rounded-md text-white'
                                    >Entrar</S.Button_Principal>
                                </div>
                            </S.Form>

                            <div className="text-center mt-4">
                            <a href='/criar-conta' className="font-semibold"
                            >Criar uma nova conta</a>
                            </div>
                                            </>)}
                        </div>

                    </div>
                </div>
        )
}
