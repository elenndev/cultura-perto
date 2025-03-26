import { Perfil } from "@/@componentes/perfil/Perfil";
import { TypePerfilArtistico } from "@/types";
import { getSessionData } from "@/utils/auth";
import axios from "axios";
import { Suspense } from "react";


const url = process.env.NEXT_PUBLIC_APP_URL

async function obterDadosPerfilArtistico(username: string){
    try{
        const req = await axios.get(`${url}/api/perfil`,{params:{username}})
    if(req.data.perfil){
        return req.data.perfil as TypePerfilArtistico
    }else{ return null }

    }catch(error){console.log(error)}
}


type Params = Promise<{ slug: string }>
export async function generateMetadata(props: {
params: Params
}) {
    const params = await props.params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slug = params.slug
}

export default async function Page(props : {params: Params}) {
    const params = await props.params
    if(!params.slug){
    return (<p>Página não encontrada | Parâmetros ausentes</p>)
    }
    const perfil = await obterDadosPerfilArtistico(params.slug)
    if(!perfil){
    return(<p>Perfil não encontrado</p>)
    }
    const session = await getSessionData()
    const isLogged = session ? session.user as {id: string, username: string} : false

    return (<>
    <Suspense fallback={<p>Carregando perfil...</p>}>
        <Perfil perfil={perfil} isLogged={isLogged}/>
    </Suspense>
    </>)
}
