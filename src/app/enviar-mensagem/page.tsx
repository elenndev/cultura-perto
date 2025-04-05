import { Suspense } from "react";
import Loader from "@/@componentes/Loader";
import {getSessionData} from '@/utils/auth'
import EnviarMensagem from "@/@componentes/enviarMensagem/EnviarMensagem";


export default async function Page() {
    const session = await getSessionData()
    const user  = session as { user: {username: string} | null }| null
        return(
            <Suspense fallback={<div className='suspense'>
                        <Loader size={'7rem'}/>
                        <p>Carregando</p>
                    </div>}>
                    <EnviarMensagem username={user?.user?.username ?? null}/>
            </Suspense>
        )
}
