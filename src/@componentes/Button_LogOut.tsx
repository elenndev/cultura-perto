'use client'
import { Button_Secundario } from "@/styles/Styles";
import { signOut } from "next-auth/react";

export function Button_LogOut(){
    async function out(){
        await signOut({callbackUrl: '/'})
    }
    return(<Button_Secundario type='button' onClick={()=>out()}>Sair da conta</Button_Secundario>)
}