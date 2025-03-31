'use client'
import { Button_Secundario } from "@/styles/Styles";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export function Button_LogOut(){
    const router = useRouter()
    async function out(){
        await signOut()
    
        router.push("/")
    }
    return(<Button_Secundario type='button' onClick={()=>out()}>Sair da conta</Button_Secundario>)
}