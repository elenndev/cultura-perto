import RedefinirSenha from "@/@componentes/esqueci_senha/RedefinirSenha"
import Loader from "@/@componentes/Loader"
import { Suspense } from "react"

export default async function Page() {
    return (<>
        <Suspense 
        fallback={<div className='flex flex-col'>
        <p>Carregando, por favor aguarde...</p>
        <Loader size='3rem'/>
        </div>}>
            <RedefinirSenha/>
        </Suspense>
    </>)
}