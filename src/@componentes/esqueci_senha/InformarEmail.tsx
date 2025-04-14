'use client'
import { useState } from "react";
import * as S from "@/styles/StyledLogin"
import Link from "next/link";


interface informarEmailProps{
    informarEmail: (email: string) => void;
}
export default function InformarEmail(props: informarEmailProps){
    const [email, setEmail] = useState("")

    function handleInformarEmail(){
        props.informarEmail(email)
    }
    return(<>
        <S.Form onSubmit={()=> handleInformarEmail()}>
            <S.FormInput>
                <label htmlFor="email">
                Email
                </label>
                <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </S.FormInput>
            <div className="mb-4 mt-2 flex w-full justify-center">
                <S.Button_Principal
                type="submit"
                className='font-semibold rounded-md text-white'
                >Continuar</S.Button_Principal>
            </div>
        </S.Form>
            <Link href='/login' className="font-semibold text-center mt-1">Voltar para tela de login</Link>

    </>)
}