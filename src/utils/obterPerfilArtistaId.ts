import axios from "axios";

const url = process.env.APP_URL;
export async function obterPerfilArtistaId(email: string){
    if(!url){
        throw new Error('Url undefined')
    }
    try{
        const req = await axios.get(`${url}/api/user`, { params: { email } })
        if(!req){
            throw new Error('Erro ao tentar fazer a requisição ao db para obter o id do perfil artistico')
        }
        if(req.data.user.perfilArtisticoId){
            return req.data.user.perfilArtisticoId
        }else{
            return null
        }
    }catch(error){console.log(error)}
}