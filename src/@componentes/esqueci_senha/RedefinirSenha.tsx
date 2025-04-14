'use client'
import { useState } from "react"
import * as S from "@/styles/StyledLogin"
import Loader from "../Loader"
import Header from "../Header";
import ConfirmarPasscode from "../ConfirmarPasscode";
import { useConta } from "@/@hooks/useConta";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import InformarEmail from "./InformarEmail";


export default function RedefinirSenha(){
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [error, setError] = useState("");
    const [passcodeConfirmado, setPasscodeConfirmado] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")

    const [informarEmail, setInformarEmail] = useState(true)
    
    function handleInformarEmail(email: string){
        setEmail(email)
        setInformarEmail(false)
    }
    const {alterarSenha} = useConta()
    const router = useRouter()

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(novaSenha != confirmarSenha){
            return setError("As senhas não coincidem")
        }

        setLoading(true)
        alterarSenha({
            email,
            novaSenha,
            notificarErro: ()=> toast.error("Erro ao tentar alterar a senha"),
            notificarSucesso
        })
    }

    function handlePasscodeConfirmado(){
        setPasscodeConfirmado(true)
    }

    function notificarSucesso(){
        setLoading(false)
        toast.success("Senha alterada com sucesso")
        router.push('/login')
    }
    
    return(
        <div className="h-full w-full flex flex-col items-center relative">
            <Header username={null}/>
            <div className='mt-14 w-full max-w-sm p-3 shadow-xl rounded-3xl border border-[#ffb162]'>
                <ToastContainer/>
                <div className="w-full max-w-sm bg-[#222e3d] shadow-xl p-4 rounded-3xl">
                    {loading ? (<div className='flex flex-col  items-center'>
                                        <Loader size='3rem'></Loader>
                                        <p>Aguarde um momento</p>
                                    </div>) : (<>
                    {passcodeConfirmado ? (<>
                    <h1 className="text-2xl font-bold text-center mb-6 text-white">Redefinir Senha</h1>
                    <S.Form onSubmit={handleSubmit}>
                        <S.FormInput>
                            <label htmlFor="password" >
                            Digitar nova senha
                            </label>
                            <input
                            type="password"
                            id="password"
                            name="password"
                            minLength={7}
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            required
                            />
                        </S.FormInput>
                        <S.FormInput>
                            <label htmlFor="confirmPassword" >
                            Confirmar Senha
                            </label>
                            <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                            />
                        </S.FormInput>

                        {error && <S.TextoErro><p>{error}</p></S.TextoErro>}

                        <div className="mb-4 mt-2 flex w-full justify-center">
                            <S.Button_Principal
                            type="submit"
                            className='font-semibold rounded-md text-white'
                            >Redefinir Senha</S.Button_Principal>
                        </div>
                    </S.Form>
                    </>) : (<>
                        {informarEmail ? (<InformarEmail informarEmail={handleInformarEmail}/>) : (
                            <ConfirmarPasscode email={email} passcodeConfirmado={handlePasscodeConfirmado} setVoltarTelaEmail={setInformarEmail}
                            mensagem="Primeiro, precisamos confirmar o seu email."/>
                        )}
                    </>)}
                    </>)}
                </div>

            </div>
        </div>
    )
}
