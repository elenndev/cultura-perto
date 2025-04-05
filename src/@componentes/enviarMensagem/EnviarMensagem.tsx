'use client'
import { useState } from "react"
import Header from "../Header"
import * as S from '@/styles/StyledLogin'
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import Modal_Loading from "../modals/Modal_Loading"

const url = process.env.NEXT_PUBLIC_APP_URL


export default function EnviarMensagem({username}:{username: string | null}){
    const [erroSugestao, setErroSugestao] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        setLoading(true)
        const mensagem = erroSugestao
        try{
            const req = await axios.post(`${url}/api/utils/mensagem`,{mensagem})
            if(req.data.mensagem == 200){
                setErroSugestao("")
            }else {
                throw new Error()
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            toast.error("Erro ao tentar enviar a mensagem, por favor tente novamente.")
            setErroSugestao(mensagem)
        } finally{ setLoading(false)}


    }
    return(
        <div className="h-full w-full flex flex-col items-center relative">
        <ToastContainer/>
            <Header username={username}/>
            {loading && (<Modal_Loading content="Enviando mensagem"/>)}
            <div className='mt-14 w-full max-w-sm p-3 shadow-xl rounded-3xl border border-[#ffb162]'>
                <div className="w-full max-w-sm bg-[#222e3d] shadow-xl p-4 rounded-3xl">
                    <h1 className="text-2xl font-bold text-center mb-6 text-white">Mande sua sugestão ou reporte algum erro</h1>
                    <S.Form onSubmit={handleSubmit}>
                        <S.FormInput>
                            <label htmlFor="erroOuSugestao">
                            Escrever mensagem:
                            </label>
                            <input
                            type="text"
                            id="erroOuSugestao"
                            name="mensagem"
                            className='border border-[#ffb162]'
                            value={erroSugestao}
                            onChange={(e) => setErroSugestao(e.target.value)}
                            required
                            />
                        </S.FormInput>

                        <div className="mb-4 mt-2 flex w-full justify-center">
                            <S.Button_Principal
                            type="submit"
                            className='font-semibold rounded-md text-white'
                            >Enviar</S.Button_Principal>
                        </div>
                    </S.Form>
                </div>

            </div>
        </div>
    )
}