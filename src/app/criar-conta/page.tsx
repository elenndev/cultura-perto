import CriarConta from "@/@componentes/criar_conta/CriarConta";
import Loader from "@/@componentes/Loader";
import { Suspense } from "react";

export default function Page(){

    return(
        <Suspense fallback={<div className='suspense'>
                    <Loader size={'7rem'}/>
                    <p>Carregando</p>
                </div>}>
            <CriarConta/>
        </Suspense>
    )
}