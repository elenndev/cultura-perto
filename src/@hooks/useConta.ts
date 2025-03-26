import { TypePerfilArtistico } from "@/types";

import axios from "axios";

const url = process.env.NEXT_PUBLIC_APP_URL


export function useConta(){
    interface deletarContaParams {
        username: string;
        handleSucesso: () => void;
        handleErro: () => void;
    }
    async function deletarConta(params: deletarContaParams){
        const {username} = params
        try{
            
            
            const req = await axios.post(`${url}/api/user/deletar`, {username})
            if(req.data.deletado == 200){
                params.handleSucesso()
            }else{
                throw new Error()
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            params.handleErro()}

    }

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
    
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error){
            throw new Error("Erro ao tentar registrar o usuário, por favor tente novamente")
        }
    }

    return{registrarNovoUsuario, deletarConta}
}