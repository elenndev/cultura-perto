import { TypePerfilArtistico } from "@/types";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_APP_URL


export function useConta(){
    interface enviarEVerificarPasscodeParams {
        email: string,
        notificarSucesso: () => void,
        notificarErro: () => void,
        notificarUsuarioInexistente?: ()=> void;
    }
    async function enviarPasscode({email, notificarSucesso, notificarErro, notificarUsuarioInexistente}: enviarEVerificarPasscodeParams){
        try{
            const req = await axios.post(`${url}/api/user/enviar-passcode`, {email})
            if(req.data.codeGeneration == 200){
                notificarSucesso()
            }else if(req.data.usuarioInexistente && notificarUsuarioInexistente){
                notificarUsuarioInexistente()
            } else { throw new Error( )}

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            notificarErro()
        }
    }

    async function validarPasscode({
        email, 
        notificarSucesso, notificarErro, notificarPinErrado,
        checarCode} : enviarEVerificarPasscodeParams & {
            checarCode: string
            notificarPinErrado: () => void}){
        try{
            const req = await axios.post(`${url}/api/user/validar-passcode`, {email, checarCode})
            if(req.data.checkCode &&  req.data.mensagem == 'passcode verificado com sucesso'){
                notificarSucesso()
            } else if (req.data.mensagem == 'passcode incorreto'){
                notificarPinErrado()
            }else { throw new Error( )}

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            notificarErro()
        }
    }


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
        
        }catch(error){
            console.log(error)
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

    interface alterarSenhaParams{
        email: string;
        novaSenha: string;
        notificarSucesso: () => void;
        notificarErro: () => void;
    }
    async function alterarSenha(params: alterarSenhaParams){
        const {email, novaSenha, notificarSucesso, notificarErro} = params
        try{
            const req = await axios.post(`${url}/api/user/mudar-senha`, {
                email,
                plainPassword: novaSenha,
            });
            if(req.data.updated == 200){
                notificarSucesso()
            } else { throw new Error() }
        }catch(error){
            console.log(error)
            notificarErro()
        }
    }

    return{registrarNovoUsuario, deletarConta, enviarPasscode, validarPasscode, alterarSenha}
}