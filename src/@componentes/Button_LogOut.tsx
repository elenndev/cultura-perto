'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export function Button_LogOut(){
    const router = useRouter()
    async function out(){
        console.log('out of here')
        await signOut()
    
        router.push("/login")
    }
    return(<button type='button' onClick={()=>out()}>Sai?r</button>)
}