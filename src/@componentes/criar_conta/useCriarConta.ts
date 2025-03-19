import { TypePerfilArtistico } from "@/types";

import axios from "axios";

const url = process.env.NEXT_PUBLIC_APP_URL


export function useCriarConta(){
    async function registrarNovoUsuario(email: string,username: string, password: string, perfil: TypePerfilArtistico) {
        try {
            const req = await axios.post(`${url}/api/user/criar`, {
                email,
                username,
                plainPassword: password,
                perfil
            });
    
            if (req.data.id) {
                return true
            } else { return null}
    
        } catch (error) {
            console.log('log:',error);
            throw new Error(`${error}`)
        }
    }

    return{registrarNovoUsuario}
}