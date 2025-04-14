'use client'
import { useConta } from '@/@hooks/useConta'
import * as S from '@/styles/StyledLogin'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from './Loader'

interface confirmarPasscodeProps{
    email: string; 
    mensagem: string;
    passcodeConfirmado: ()=>void;
    setVoltarTelaEmail?: (param: boolean) => void;
}
export default function ConfirmarPasscode(props: confirmarPasscodeProps){
    const {email, passcodeConfirmado, mensagem, setVoltarTelaEmail} = props
    const [passcode, setPasscode] = useState('')
    const [iniciarEnviarPasscode, setIniciarEnviarPasscode ] = useState(true)
    const [enviandoPasscode, setEnviandoPasscode] = useState(false)
    const [verificandoPasscode, setVerificandoPasscode] = useState(false)

    const {enviarPasscode, validarPasscode} = useConta()


    async function handleSubmit(e: React.FormEvent){
        setVerificandoPasscode(true)
        e.preventDefault()
        if(passcode.includes(' ') || !passcode){
            return
        }

        await validarPasscode({
            email: email,
            checarCode: passcode,
            notificarErro: ()=> {
                setVerificandoPasscode(false)
                toast.error("Erro ao tentar verificar o pin, tente novamente")},
            notificarPinErrado: ()=>{
                setVerificandoPasscode(false)
                toast.error("Passcode incorreto, por favor tente novamente")
            },
            notificarSucesso: () => passcodeConfirmado()
        })
    }

    function notificarUsuarioInexistente(){
        setEnviandoPasscode(false);
        setVerificandoPasscode(false)
        setIniciarEnviarPasscode(false)
        if(setVoltarTelaEmail){
            setVoltarTelaEmail(true)
        }
        toast.error("Usuário não encontrado para este email")
    }

    function handleEnviarPasscode(){
        enviarPasscode(
            {email,
            notificarSucesso: () => {
                setEnviandoPasscode(false);
                setIniciarEnviarPasscode(false)
                toast.done("Pin enviado")},
            notificarErro: ()=> {
                setEnviandoPasscode(false);
                toast.error("Erro ao tentar enviar o pin para o email")},
            notificarUsuarioInexistente})
    }

    return(
    <div className="flex flex-col shadow-xl rounded-3xl border border-[#ffb162]">
        <div className="w-full bg-[#222e3d] shadow-xl p-4 rounded-3xl">
            {iniciarEnviarPasscode ? (
                <div className='flex flex-col relative items-center gap-y-2'>
                    {(enviandoPasscode || verificandoPasscode) ? (
                        <div className='flex flex-col justify-center items-center'>
                            <p>{enviandoPasscode && 'Enviando'}{verificandoPasscode && 'Verificando'}, por favor aguarde</p>
                            <Loader size='3rem'/>
                        </div>
                        ):(<>
                            <p className="text-center border-b border-[#ffb162]">{mensagem}</p>
                            <p>Será enviado no seu email um código de 6 dígitos</p>
                            <p>Fique atento também à caixa de spam !</p>
                            <S.Button_Principal onClick={()=>{setEnviandoPasscode(true);handleEnviarPasscode()}}>Entendido, enviar código</S.Button_Principal>
                        </>)}
                </div>
                ) : (<>
                <S.Form onSubmit={(e)=>{setVerificandoPasscode(true);handleSubmit(e)}}>
                    <S.FormInput>
                        <fieldset>
                            <legend className='text-center mb-1'>Confirme o pin que foi enviado no email</legend>
                            <input type="text" minLength={6}  maxLength={6} value={passcode} onChange={(e)=>setPasscode(e.target.value)}/>
                        </fieldset>
                    </S.FormInput>
                    <S.Button_Principal type='submit'>Enviar</S.Button_Principal>
                </S.Form>
            </>)}
        </div>
    </div>
    )

}